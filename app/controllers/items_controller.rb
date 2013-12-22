class ItemsController < ApplicationController
  def index
    render :json => {:status => "error", :message => 'Invalid request, items must be individually requested'}, :status => 405
  end
  
  def create
    #Instantiate object
    item = Item.new(item_params)
    #Save Object
    if item.save
      #if successful save, output the saved data
      render :json => {:status => 'success', :item => item}
    else
      #if unsuccessful, present error
      render :json => {:status => 'error', :message => "Couldn't create Item"}
    end
  end
  
  def new
    #you can create a new without passing a list, but this isn't supported for the app as it needs a list to be tied unto
    
    render :json => {:status => 'error', :message => "This method is not supported."}
  end
  
  def edit
    if Item.where(params[:id]).blank?
      render :json => {:status => 'error', :message => "The requested item does not exist."}, :status => 404
    else
      selected_item = Item.find(params[:id])
      render :json => {:status => 'success', :item => selected_item}
    end 
  end
  
  def show
    if Item.where(params[:id]).blank?
      render :json => {:status => 'error', :message => "The requested item does not exist."}, :status => 404
    else
      selected_item = Item.find(params[:id])
      render :json => {:status => 'success', :item => selected_item}
    end
  end
  
  def update
    if Item.where(:id => params[:id]).blank?
      render :json =>{:result => 'error', :message => 'The requested item does not exist.'}, :status => 404
    else
      selected_item = Item.find(params[:id]) 
      selected_item.update_attributes(item_params)
      if selected_item.save
        render :json => {:result => 'success', :item => selected_item}
      else
        render :json => {:result => 'error', :message => "Could not update item"}
      end
    end
  end
  
  def destroy
    if Item.where(:id => params[:id]).blank?
      render :json => {:status => "error", :message => 'No such Item was found.'}
    else
      item = Item.find(params[:id])
      item.destroy()
      render :json => {:status => 'success', :deleted_list => item}
    end
  end
  
  private
  
    def item_params
      params.require(:item).permit(:list_id, :item_id, :quantity,:item_name, :approximate_cost, :source, :source_url, :reason_for_item)
    end
end
