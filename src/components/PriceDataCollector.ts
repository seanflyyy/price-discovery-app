/* eslint-disable @typescript-eslint/no-explicit-any */
import {PricingData} from "@/types";

export class PriceDataCollector {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000; // 1 second

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private logRequestDetails(website: string, attempt: number) {
    console.log(
      `[Request Details] Attempt ${attempt}:
`,
      {
        website,
        timestamp: new Date().toISOString(),
      }
    );
  }

  private async makeRequest(
    website: string,
    attempt: number = 1
  ): Promise<any> {
    this.logRequestDetails(website, attempt);
    const startTime = Date.now();

    try {
      const response = await fetch("/api/pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({website}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const duration = Date.now() - startTime;

      console.log(
        `[Response Success] Website: ${website}
`,
        {
          duration: `${duration}ms`,
          status: response.status,
          dataSize: JSON.stringify(data).length,
          data: data,
        }
      );

      return data;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(
        `[API Error] Website: ${website}, Attempt: ${attempt}
`,
        {
          duration: `${duration}ms`,
          error: error instanceof Error ? error.message : "Unknown error",
        }
      );

      if (attempt < this.maxRetries) {
        console.log(`[Retry] Attempting retry ${attempt + 1} for ${website}`);
        await this.delay(this.retryDelay * attempt);
        return this.makeRequest(website, attempt + 1);
      }

      throw error;
    }
  }

  async collectPriceData(websites: string[]): Promise<PricingData[]> {
    console.log("[Starting Price Collection]", {
      websitesCount: websites.length,
      timestamp: new Date().toISOString(),
    });

    try {
      const allPricingData: PricingData[] = [];

      for (const website of websites) {
        const response = await this.makeRequest(website);

        if (response?.data?.products) {
          const products = response.data.products.map((product: any) => ({
            product_name: product.product_name,
            price: product.product_price,
            website: website,
          }));
          allPricingData.push(...products);
        }
      }

      console.log("[Collection Complete]", {
        totalProducts: allPricingData.length,
        timestamp: new Date().toISOString(),
      });

      return allPricingData;
    } catch (error) {
      console.error("[Collection Failed]", {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }
}
