/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',  // 프론트엔드에서 /api로 시작하는 모든 요청
          destination: 'http://localhost:8080/api/:path*',  // 백엔드 API 서버로 프록시
        },
      ];
    },
  };
  
  export default nextConfig;
  