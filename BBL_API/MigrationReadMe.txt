!!!! Uncomment Ignored lines in BBLContext before creating a migration 

--> BBL.API 'Startup Project' and 'PMC (Package Manager Console) set 'Default Project' -> 'BBL.DataAccess'

add-migration initial -context BBLContext -o EntityFramework/Migrations

update-database -context BBLContext

remove-migration -context BBLContext 

sudo dotnet ef migrations add v1 --context BBLContext
sudo dotnet ef database update --context BBLContext

dotnet publish -c Release -o ./bin/release/publish
dotnet publish -c Release -r win-x64 --self-contained true -o ./bin/release/publish
