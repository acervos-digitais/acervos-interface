let GradioClient = null;

async function getGradioClient(apiUrl) {
  if (GradioClient) {
    return await GradioClient.connect(apiUrl);
  }
  try {
    const module = await import("https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js");
    GradioClient = module.Client;
    return await GradioClient.connect(apiUrl);
  } catch (error) {
    console.error("Failed to load module:", error);
  }
}
