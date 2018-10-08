const GREY = "#9E9E9E";

const styles = {
  header: {
    // styles go here!
  },
  well: {
    boxShadow: `1px 3px 1px ${GREY}`,
  },
};

const Title = props => (
  <div style={styles.well}>
    <div style={styles.header}>Business Background</div>
    <hr />
    <p>hello hello</p>
  </div>
);
