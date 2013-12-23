module ApplicationHelper
  def site_name
     "ToGet"
   end

   def site_url
     if Rails.env.production?
       "http://toget.projects.mym.ac"
     else
       "http://localhost:3000"
     end
   end

   def meta_author
     "Kristofor Vokes"
   end

   def meta_description
     "A basic shopping list done in RoR"
   end

   def meta_keywords
     "list ruby rails gift apple"
   end

   # Returns the full title on a per-page basis.
   def full_title(page_title)
     if page_title.empty?
       site_name
     else
       "#{page_title} | #{site_name}"
     end
   end
end
