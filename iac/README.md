# Infrastructure as Code

## Deploy with ARM template

First, you should create a GitHub personal Access token. See [this document](vhttps://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) and set the permission as `repo` for private repository or `public_repo` for public repository.

```ps1
$RESOURCE_GROUP="<Resource group name>"
$LOCATION="<Location ex. japaneast>"

$IDENTIFIER="<Identifier you prefer>"
$GITHUB_REPOSITORY_URL="https://github.com/{user or organization}/{repository name}"
$GITHUB_REPOSITORY_TOKEN="<Your personal access token with correct permission>"

az group create `
  --name $RESOURCE_GROUP `
  --location $LOCATION

az deployment group create `
  --resource-group $RESOURCE_GROUP `
  --name "deployment" `
  --confirm-with-what-if `
  --template-file iac/arm-template.json `
  --parameters @iac/arm-template.parameters.json `
  --parameters `
    identifier=$IDENTIFIER `
    staticWebAppRepositoryUrl=$GITHUB_REPOSITORY_URL `
    staticWebAppRepositoryToken=$GITHUB_REPOSITORY_TOKEN `
```

If you would like to set another parameter, see `arm-template.json` and `arm-template.parameters.json` for example SignalR service's sku (Default here, the sku is set as Standard plan.).

If you would like to set Application settings, run the command below after API's deployment is deployed by GitHub Actions's workflow.

```ps1
az staticwebapp appsettings set `
  --resource-group $RESOURCE_GROUP `
  --name "static-$IDENTIFIER" `
  --setting-names AzureSignalRConnectionString=<SignalR service connection string>
```