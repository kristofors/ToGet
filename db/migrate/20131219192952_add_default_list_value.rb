class AddDefaultListValue < ActiveRecord::Migration
  def change
    change_column :lists, :list_name, :string, :default => "New List"
  end
end