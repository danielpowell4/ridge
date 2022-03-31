export const asPercent = (part, whole) => {
  const percent = (part / whole) * 100
  if (parseInt(percent) === parseFloat(percent)) {
    return `${percent}%`
  } else {
    return `${percent.toFixed(2)}%`
  }
}

export const buildReport = (answers) => answers.reduce(
  (breakdown, answer) => {
    breakdown.available++

    if (answer.correct) {
      breakdown.correct++;
    }
    if (answer.incorrect) {
      breakdown.incorrect++;
    }
    if (answer.omitted) {
      breakdown.omitted++;
    }

    for (let answerTag of answer.tags) {
      let hadTagType;
      let tagType;
      let hadTagResult;
      let tagResult;

      if (!!breakdown.tags.find((t) => t.type === answerTag.type)) {
        hadTagType = true;
        tagType = breakdown.tags.find((t) => t.type === answerTag.type);
      } else {
        hadTagType = false;
        tagType = { type: answerTag.type, results: [] };
      }

      if (!!tagType.results.find((r) => r.name === answerTag.name)) {
        hadTagResult = true;
        tagResult = tagType.results.find((r) => r.name === answerTag.name);
      } else {
        hadTagResult = false;
        tagResult = {
          name: answerTag.name,
          available: 0,
          ratio: 0,
          correct: 0,
          correctQuestionIds: [],
          correctQuestionPositions: [],
          incorrect: 0,
          incorrectQuestionIds: [],
          incorrectQuestionPositions: [],
          omitted: 0,
          omittedQuestionIds: [],
          omittedQuestionPositions: [],
        };
      }

      tagResult.available++;

      if (answer.correct) {
        tagResult.correct++;
        tagResult.correctQuestionIds = [
          ...tagResult.correctQuestionIds,
          answer.questionId,
        ];
        tagResult.correctQuestionPositions = [
          ...tagResult.correctQuestionPositions,
          answer.questionPosition,
        ];
      }
      if (answer.incorrect) {
        tagResult.incorrect++;
        tagResult.incorrectQuestionIds = [
          ...tagResult.incorrectQuestionIds,
          answer.questionId,
        ];
        tagResult.incorrectQuestionPositions = [
          ...tagResult.incorrectQuestionPositions,
          answer.questionPosition,
        ];
      }
      if (answer.omitted) {
        tagResult.omitted++;
        tagResult.omittedQuestionIds = [
          ...tagResult.omittedQuestionPositionIds,
          answer.questionId,
        ];
        tagResult.omittedQuestionPositions = [
          ...tagResult.omittedQuestionPositions,
          answer.questionPosition,
        ];
      }

      tagResult.ratio = tagResult.correct / tagResult.available;

      if (hadTagType) {
        if (hadTagResult) {
          breakdown.tags = breakdown.tags.map((t) =>
            t.type === answerTag.type
              ? {
                ...t,
                results: t.results.map((r) =>
                  r.name === answerTag.name ? tagResult : r
                ),
              }
              : t
          );
        } else {
          breakdown.tags = breakdown.tags.map((t) =>
            t.type === answerTag.type
              ? { ...t, results: [...t.results, tagResult] }
              : t
          );
        }
      } else {
        breakdown.tags = [
          ...breakdown.tags,
          { ...tagType, results: [tagResult] },
        ];
      }
    }

    return breakdown;
  },
  { available: 0, correct: 0, incorrect: 0, omitted: 0, tags: [] }
);
