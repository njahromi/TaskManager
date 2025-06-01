FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5052

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
VOLUME ["/app/data"]
ENV ASPNETCORE_URLS=http://+:5052
ENV ConnectionStrings__DefaultConnection=Data Source=/app/data/tasks.db
ENTRYPOINT ["dotnet", "backend.dll"] 