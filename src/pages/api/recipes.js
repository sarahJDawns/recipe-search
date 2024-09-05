export async function get({ request }) {
  const url = new URL(request.url);
  const maxCalories = url.searchParams.get('maxCalories');
  const maxCarbs = url.searchParams.get('maxCarbs');
  const maxFat = url.searchParams.get('maxFat');
  const minProtein = url.searchParams.get('minProtein');

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?number=2&addRecipeInformation=true&instructionsRequired=true&apiKey=${
    import.meta.env.API_KEY
  }&maxCarbs=${maxCarbs}&minProtein=${minProtein}&maxCalories=${maxCalories}&maxFat=${maxFat}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch recipes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
