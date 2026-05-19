export interface Property {
  id: string
  title: string
  address: string
  price: string
  type: "Residential" | "Commercial" | "Land" | "Multi-Family"
  status: "Available" | "Under Contract" | "Sold"
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  imageAlt: string
  featured?: boolean
}

export interface TeamMember {
  name: string
  title: string
  bio: string
  imageAlt: string
}

export interface Service {
  id: string
  title: string
  summary: string
  description: string
  icon: string
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  propertyType: string
  budgetRange: string
  timeline: string
  message: string
  website: string // honeypot
}

export interface LeadFormErrors {
  name?: string
  email?: string
  phone?: string
  propertyType?: string
  budgetRange?: string
  timeline?: string
  message?: string
}
