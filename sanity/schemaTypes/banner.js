import { defineField, defineType } from "sanity";

export const banner = defineType({
    type: "document",
    name: "banner",
    fields: [
        defineField({
            type: "image",
            name: "image",
            title: "Image",
            options: {
                hotspot: true
            }
        }),
        defineField({
            type: "string",
            name: "buttonText",
            title: "Button Text"
        }),
        defineField({
            type: "string",
            name: "product",
            title: "Product Name"
        }),
        defineField({
            type: "string",
            name: "desc",
            title: "Description"
        }),
        defineField({
            type: "string",
            name: "smallText",
            title: "Small Text"
        }),
        defineField({
            type: "string",
            name: "midText",
            title: "Medium Text"
        }),
        defineField({
            type: "string",
            name: "largeText1",
            title: "Large Text 1"
        }),
        defineField({
            type: "string",
            name: "largeText2",
            title: "Large Text 2"
        }),
        defineField({
            type: "string",
            name: "discount",
            title: "Discount"
        }),
        defineField({
            type: "string",
            name: "saleTime",
            title: "Sale Time"
        })
    ]
})