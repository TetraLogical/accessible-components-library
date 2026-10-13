# VS Code Settings

To connect up the feature files for linting use the following config in `.vscode/settings.json`

```json
{
  "cucumber.features": [
    "src/components/**/features/**/*.feature"
  ],
  "cucumber.glue": [
    "src/tests/**/*.js"
  ]
}
```
