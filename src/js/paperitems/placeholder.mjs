import { AnnotationItem } from "./annotationitem.mjs";

/**
 * Represents a placeholder annotation item.
 * @class
 * @memberof OSDPaperjsAnnotation
 * @extends AnnotationItem
 * @description The `Placeholder` class represents a placeholder annotation item. It inherits from the `AnnotationItem` class and provides methods to work with placeholder annotations.
 */
class Placeholder extends AnnotationItem{
    /**
     * Create a new Placeholder instance.
     * @param {Object} geoJSON - The GeoJSON object containing annotation data.
     * @property {paper.Path} _paperItem - The associated paper item representing the placeholder.
     * @description This constructor initializes a new placeholder annotation item based on the provided GeoJSON object.
     */
    constructor(geoJSON){
        super(geoJSON);
        
        this.paperItem = new paper.Path();
        // this.paperItem.style = this.paperItem.instructions = geoJSON;
        this.paperItem.style = geoJSON.properties;

        this.paperItem.initializeGeoJSONFeature = initialize;
    }
    /**
     * Retrieves the supported types by the Placeholder annotation item.
     * @static
     * @returns {Object} An object with type property set to null.
     * @description This static method provides information that the Placeholder annotation item does not have a specific type.
     */
    static get supportsType(){
        return {
            type: null
        }
    }
    /**
     * Retrieves the coordinates of the placeholder.
     * @returns {Array} An empty array.
     * @description This method returns an empty array since the Placeholder class does not have coordinates.
     */
    getCoordinates(){
        return [];
    }
    /**
     * Retrieves the properties of the placeholder.
     * @returns {Object} The properties object.
     * @description This method returns the properties associated with the placeholder.
     */
    getProperties(){
        let item = this.paperItem;
        return item.style;
    }
    
}

export{Placeholder};

/**
 * Initializes a GeoJSON feature based on the provided geometry type and subtype.
 * @param {string} geoJSONGeometryType - The GeoJSON geometry type.
 * @param {string} geometrySubtype - The subtype of the geometry.
 * @returns {paper.Item} The created paper item.
 * @private
 * @description This function initializes a GeoJSON feature using the provided geometry type and subtype, and returns the corresponding paper item.
 */
function initialize(geoJSONGeometryType, geometrySubtype) {
    let item = this;
    // let geoJSON = item.instructions;
    let geoJSON = {
        geometry:{
            type: geoJSONGeometryType,
            coordinates: [],
            properties: {
                subtype:geometrySubtype,
            },
        },
        properties: item.style,
    };
    
    let newItem = paper.Item.fromGeoJSON(geoJSON);
    // newItem.selected=item.selected;
    item.replaceWith(newItem);
        
    return newItem;
}