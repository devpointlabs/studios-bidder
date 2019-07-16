class EstimateMailer < ApplicationMailer
  default from: "studiobiddertest@gmail.com"

  layout "mailer"

  def estimate_email(user, estimate)
    @estimate = estimate
    mail(to: user.email, subject: 'Sample Email')
  end
end
