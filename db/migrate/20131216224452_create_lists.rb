class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :list_name, :null => false
      t.boolean :active, :default => true
      t.timestamps
    end
  end
end
