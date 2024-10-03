import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: "o4jp1xkv",
    dataset: "production",
    apiVersion: "2024-07-09",
    useCdn: false,
    token: "skU9DsLnOvWgTLOki8Cu2jkwJ2u0VM9O7AXISH9Rm7Ft3cXu0bqPvHloPiz30lXGf3uL0LkSxkQ8wzmwiY0zdP9vt5sEhB8FMk2XsGY63QKr44vbvYfILDrY6KsBSZDMYzJKQeY08D9mVnsWCM173YupVImKix8OU91LYzevG2ADOcRaDmtz"
});

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)