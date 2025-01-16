import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../../../apps/backend/generated/schema.graphql',
  documents: 'graphql/**/*.graphql',
  hooks: {
    afterAllFileWrite: [`prettier --write`],
  },
  generates: {
    'generated/apollo.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        useTypeImports: true,
        defaultScalarType: 'unknown', // typescript
        strictScalars: true, // typescript
        enumsAsConst: true,
        scalars: {
          // typescript
          DateTime: 'string',
        },
      },
    },
  },
}

export default config
