class AddDefaultItemValue < ActiveRecord::Migration
  def change
    change_column_default :items, :item_name, "New Item"
  end
end