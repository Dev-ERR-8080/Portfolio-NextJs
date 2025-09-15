import { supabase } from '@/lib/supabaseClinet'

export default async function handler(req , res) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      description,
      github_url,
      live_url,
      background_url,
      features (
        id,
        title,
        feature_details (
          description,
          image_url
        )
      )
    `)

  if (error) {
    console.error('Supabase error:', error)
    res.status(500).json({error:"Databasec skills query failed","details":error.message});
  }else{
     res.status(200).json(data);
  }
}
