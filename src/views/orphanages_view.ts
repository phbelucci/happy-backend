import Orphanage from '../models/Orphanage'
import images_view from './images_view'
export default {
    render(orphanage : Orphanage){
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.latitude,
            about: orphanage.longitude,
            instructions: orphanage.instructions,
            openingHours: orphanage.openingHours,
            openOnWeekends: false,
            images: images_view.renderMany(orphanage.images)
        }
    },

    renderMany(orphanages : Orphanage[]){
        return orphanages.map( orphanage => this.render(orphanage))
    }
}