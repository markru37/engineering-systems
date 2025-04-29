export default function ({ redirect, route }) {
  const openingPage = Number(route.params.page)

  if (!openingPage || openingPage < 1) {
    return redirect('/1', route.query)
  }
}
