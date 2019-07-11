class AddColumnToFeatureEstimates < ActiveRecord::Migration[5.2]
  def change
    add_column :feature_estimates, :design, :integer
    add_column :feature_estimates, :qaTesting, :integer
    add_column :feature_estimates, :deployment, :integer
    add_column :feature_estimates, :postDeploymentDev, :integer
    add_column :feature_estimates, :projectManagement, :integer
    add_column :feature_estimates, :generalBuffer, :integer
  end
end
