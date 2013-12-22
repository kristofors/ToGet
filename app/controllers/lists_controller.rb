class ListsController < ApplicationController
  layout "blank"
  def index
    list
    #render :json => {:result => 'success', :lists => @lists, :listCount => @lists.size }
  end
  
  def create
    #Instantiate object
    list = List.new(list_params)
    #Save Object
    if list.save
      #if successful save, output the saved data
      render :json => {:status => 'success', :list => list}
    else
      #if unsuccessful, present error
      render :json => {:status => 'error', :message => "Couldn't create List"}
    end
  end
  
  def list
    lists = List.where(:active=>true).order('lists.created_at ASC')
    render :json => {:result => 'success', :lists => lists.as_json(include: {items: {only: [:id, :item_name]}}, 
      only: [:id,:list_name] ), :listCount => lists.size }
  end
  
  def show
    if List.where(:id => params[:id]).blank?
      render :json =>{:result => 'error', :message => 'The requested list does not exist.'}, :status => 404
    else
      selected_list = List.find(params[:id]) 
      render :json => {:result => 'success', :list => selected_list.as_json(include: :items)}
    end
  end
  
  def new
    list = List.new
    list.save
    render :json => {:status => "success", :list => list}
  end
  
  def edit
    if List.where(:id => params[:id]).blank?
      render :json =>{:result => 'error', :message => 'The requested list does not exist.'}, :status => 404
    else
      selected_list = List.find(params[:id]) 
      render :json => {:result => 'success', :list => selected_list.as_json(include: :items)}
    end
  end
  
  def update
    render :json => {:status => :error, :message => "not supported"}
  end
  
  def destroy
    if List.where(:id => params[:id]).blank?
      render :json => {:status => "error", :message => 'No such list was found.'}
    else
      list = List.find(params[:id])
      list.destroy
      render :json => {:status => 'success', :deleted_list => list}
    end
  end
  
  private
  
    def list_params
      params.permit(:list_name, :active)
    end
end

  

