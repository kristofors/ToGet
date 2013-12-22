class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :list_id
      t.integer :quantity, :default => 1
      t.string :item_name, :null => false
      t.decimal :approximate_cost, :precision => 10, :scale => 2, :default => 0.00
      t.string :source, :default => ""
      t.string :source_url, :default => ""
      t.text :reason_for_item
      t.boolean :received, :default => false
      t.timestamps
    end
    add_index("items","list_id")
  end
end
