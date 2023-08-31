export { default } from "next-auth/middleware";

export const config = { matcher: ["/private/:path*"] };

// export default function middleware() {
//   //todo handle that later
// }
