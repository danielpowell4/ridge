
pp_clients = Client.where(id: ClientType.private_prep.client_type_assignments.select(:client_id))
activated_clients = pp_clients.where(id: Referral.where(referred_type: 'Client').select(:referred_id)).where.not(activated_at: nil)

report = (1..40).to_a.map do |month|
  month_starts = month.months.ago.beginning_of_month
  month_range = month_starts.all_month
  new_month_clients = activated_clients.where(created_at: month_range)

  blob = {
    month_starting: month_starts.to_date.to_s,
    new_month_clients: new_month_clients.count
  }

  [
    ['Client'],
    ['Contact'],
    ['Employee'],
    ['Private Prep Website'],
    ['School Program'],
    ['Unknown'],
    ['Other', ['Camp', 'Presentation', 'Corporate Partnership', 'Google Search', 'Partnership Email', 'Social Media', 'Other']]
  ].each do |label, ref_type_names|
    ref_types = ReferralType.where(name: ref_type_names.presence || label)
    type_referrals = Referral.where(referral_type_id: ref_types.select(:id), referred_type: 'Client', referred_id: new_month_clients.select(:id))

    if label == 'Private Prep Website'
      blob[label] = type_referrals.filter { |referral| referral.referred.referring_sources.where.not(referral_type: ReferralType.website).any? }.count
    else
      blob[label] = type_referrals.sum { |referral| 1.0 / referral.referred.referring_sources.where.not(referral_type: ReferralType.website).count }.round(2)
    end
  end

  blob
end
