import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('JWTtoken'); // Assuming you store the token in localStorage
  if (token) {
    debugger
    req = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
  }
  return next(req);
};
