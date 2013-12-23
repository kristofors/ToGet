class List < ActiveRecord::Base
  has_many :items, dependent: :destroy
  
  validates_presence_of :list_name, :message => "can't be blank"
  
  before_validation :trim_name
  
  
  
  private
  
  def trim_name
    # This method will work on a non-null list_name. If the text is over 32 characters, the text will be truncated.
    if !self.list_name.nil?
      if self.list_name.length > 31
        self.list_name = self.list_name[0,31] + "…"
      else
        self.list_name = self.list_name[0,32]
      end
    end
  end
end
