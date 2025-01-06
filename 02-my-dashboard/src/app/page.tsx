import { redirect } from 'next/navigation';

export default function HomePage() {

  // redirect es una funcion para redireccionar
  redirect('/dashboard/main');

}
