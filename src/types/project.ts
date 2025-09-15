// types/project.ts

export interface FeatureDetail {
  description: string
  image_url: string
}

export interface Feature {
  id: string
  title: string
  feature_details: FeatureDetail[]
}

export interface Project {
  id: string
  title: string
  description: string
  github_url: string
  live_url: string
  background_url: string
  features: Feature[]
}
