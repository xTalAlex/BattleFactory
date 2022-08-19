export async function post({ request }) {
  const requestBody = await request.json();


  const recaptchaURL = 'https://battlefactory-admin.herokuapp.com/api/squads';
  const response = await fetch(recaptchaURL, {
    headers : {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
    method: "POST",
    body: JSON.stringify(requestBody)
  });

  const responseData = await response.json();
  return new Response(JSON.stringify(responseData), { status: response.status });
}