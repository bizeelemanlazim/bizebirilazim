#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["BBL.API/BBL.API.csproj", "BBL.API/"]
COPY ["BBL.Business/BBL.Business.csproj", "BBL.Business/"]
COPY ["BBL.Core/BBL.Core.csproj", "BBL.Core/"]
COPY ["BBL.DataAccess/BBL.DataAccess.csproj", "BBL.DataAccess/"]
COPY ["BBL.Entities/BBL.Entities.csproj", "BBL.Entities/"]
RUN dotnet restore "BBL.API/BBL.API.csproj"
COPY . .
WORKDIR "/src/BBL.API"
RUN dotnet build "BBL.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BBL.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BBL.API.dll"]