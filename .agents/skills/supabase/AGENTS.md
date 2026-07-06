# Supabase Connection Tunnel

When interacting with the Supabase MCP server or performing database operations for this project, ensure that the connection tunnel to the self-hosted Supabase instance is active. 

If you encounter connection issues, first verify if the tunnel is already running (e.g., check running background tasks). If it is not running, start the SSH tunnel in the background:
`CONTAINER_IP=$(ssh root@37.27.5.216 "docker inspect supabase-kong-ess6muix4mie603xhtshdhih --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'") && ssh -L localhost:8080:$CONTAINER_IP:8000 root@37.27.5.216`
