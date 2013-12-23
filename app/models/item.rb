class Item < ActiveRecord::Base
  #The item class contains individual entries in a list. An Item belongs to a single List. 
  #Below is a description of the model objects
  # quantity: :default of 1 It is the obvious requested quantity of an item desired
 #  item_name: Name of the item
 #  approximate_cost: the cost of an individual item
 #  source: where the item may be acquired
 #  source_url: if the source is online, a link to the product
 #  reason_for_item: why it is on the list
 #  received: if the item has been acquired
  
  belongs_to :list
  
  validates_presence_of (:item_name), :message => "Missing item name"
  
  
  
end
