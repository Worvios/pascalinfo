"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */
const vision_1 = require("@sanity/vision");
const sanity_1 = require("sanity");
const structure_1 = require("sanity/structure");
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
const env_1 = require("./src/sanity/env");
const schemaTypes_1 = require("./src/sanity/schemaTypes");
const structure_2 = require("./src/sanity/structure");
exports.default = (0, sanity_1.defineConfig)({
    basePath: '/studio',
    projectId: env_1.projectId,
    dataset: env_1.dataset,
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema: schemaTypes_1.schema,
    plugins: [
        (0, structure_1.structureTool)({ structure: structure_2.structure }),
        // Vision is for querying with GROQ from inside the Studio
        // https://www.sanity.io/docs/the-vision-plugin
        (0, vision_1.visionTool)({ defaultApiVersion: env_1.apiVersion }),
    ],
});
