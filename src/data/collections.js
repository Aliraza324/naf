import pintball from '../assets/images/pintball.png'
import pintballone from '../assets/images/pintballone.png'
import pintballtwo from '../assets/images/pintballtwo.png'
import goggles from '../assets/images/goggles.png'
import gogglesone from '../assets/images/gogglesone.png'
import gloves from '../assets/images/gloves.png'
import glovestwo from '../assets/images/glovestwo.png'
import jersey from '../assets/images/jersey.png'
import jerseyone from '../assets/images/jerseyone.png'

// Mock collections data for categories
export const collections = {
  'paintballs': [
    { id: 'pb-1', title: 'Pro Paintball Pack - 2000ct', price: 64.0, image: pintball },
    { id: 'pb-2', title: 'Precision Paintballs - 500ct', price: 24.5, image: pintballone },
    { id: 'pb-3', title: 'Eco Paintballs - 100ct', price: 6.5, image: pintballtwo },
  ],
  'goggles-masks': [
    { id: 'gm-1', title: 'GhostSpec Thermal Mask', price: 185.0, image: goggles },
    { id: 'gm-2', title: 'Ballistic Goggles - Smoke', price: 45.0, image: gogglesone },
  ],
  'tactical-gloves': [
    { id: 'tg-1', title: 'Vortex NV-400 Tactical Gloves', price: 129.0, image: gloves },
    { id: 'tg-2', title: 'GripForce Pro Gloves', price: 39.0, image: glovestwo },
  ],
  'team-jerseys': [
    { id: 'tj-1', title: 'Sentinel Elite Jersey - Multi', price: 135.0, image: jersey },
    { id: 'tj-2', title: 'Rapid Fire Jersey - Storm Blue', price: 85.0, image: jerseyone },
  ],
}
