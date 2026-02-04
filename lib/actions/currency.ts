"use server"

export async function getExchangeRateAction() {
  try {
    // Usamos una API gratuita confiable para obtener la tasa de cambio COP -> USD
    // Alternativamente podemos usar https://api.exchangerate-api.com/v4/latest/COP
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/COP', {
      next: { revalidate: 3600 } // Revalidar cada hora
    });
    
    if (!response.ok) throw new Error('No se pudo obtener la tasa de cambio');
    
    const data = await response.json();
    return {
      success: true,
      rate: data.rates.USD,
      date: data.date
    };
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Tasa de cambio de respaldo (aproximada) si falla la API
    return {
      success: false,
      rate: 0.00025, // Aproximadamente 1 USD = 4000 COP
      error: 'Usando tasa de respaldo'
    };
  }
}
