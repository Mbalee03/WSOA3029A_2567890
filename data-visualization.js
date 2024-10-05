//BAR GRAPH

// URL of the API
const apiUrl = "https://stephen-king-api.onrender.com/api/books";

// Function to fetch data from the API
async function fetchBooks() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const responseData = await response.json();
    console.log("Response Data:", responseData);
    const data = responseData.data;
    console.log("Books Data:", data);

    drawChart(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Sample data: Replace this with your data from the API
const booksData = [
  { Year: 1974, Pages: 199, Title: "Carrie" },
  { Year: 1975, Pages: 439, Title: "Salem's Lot" },
  { Year: 1977, Pages: 447, Title: "The Shining" },
  { Year: 1980, Pages: 426, Title: "Firestarter" },
  { Year: 1982, Pages: 384, Title: "Different Seasons" },
  { Year: 1983, Pages: 374, Title: "Pet Sematary" },
  { Year: 1984, Pages: 544, Title: "The Talisman" },
];

// Set up SVG dimensions
const HEIGHT = 400;
const WIDTH = 600;
const PADDING = 50;

// Set up SVG
const svg = d3
  .select("#bar-graph")
  .append("svg")
  .attr("height", HEIGHT)
  .attr("width", WIDTH)
  .style("background-color", "#f0f0f0");

// Set up scales
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(booksData, (d) => d.Pages)])
  .range([PADDING, WIDTH - PADDING]);

const yScale = d3
  .scaleBand()
  .domain(booksData.map((d) => d.Year)) // Years for y-axis
  .range([PADDING, HEIGHT - PADDING])
  .padding(0.1);

// Create axes
svg
  .append("g")
  .attr("transform", `translate(0, ${HEIGHT - PADDING})`)
  .call(d3.axisBottom(xScale).tickFormat(d3.format("d"))); // Label x-axis

svg
  .append("g")
  .attr("transform", `translate(${PADDING}, 0)`)
  .call(d3.axisLeft(yScale)); // Label y-axis

// Create a tooltip
const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Draw the bars
svg
  .selectAll("rect")
  .data(booksData)
  .enter()
  .append("rect")
  .attr("x", PADDING)
  .attr("y", (d) => yScale(d.Year))
  .attr("height", yScale.bandwidth())
  .attr("width", (d) => xScale(d.Pages) - PADDING)
  .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
  .on("mouseover", function (event, d) {
    tooltip.transition().duration(200).style("opacity", 1);
    tooltip
      .html(d.Title)
      .style("left", event.pageX + "px")
      .style("top", event.pageY - 30 + "px");
  })
  .on("mouseout", function () {
    tooltip.transition().duration(500).style("opacity", 0);
  });

svg
  .selectAll("text")
  .data(booksData)
  .enter()
  .append("text")
  .attr("x", (d) => xScale(d.Pages) + 5)
  .attr("y", (d) => yScale(d.Year) + yScale.bandwidth() / 2)
  .attr("dy", ".35em")
  .text((d) => d.Pages)
  .attr("fill", "white")
  .attr("font-size", "12px");

// Fetch books data
fetchBooks();

//PIE CHART

// Function to fetch data from the API for the pie chart
async function fetchBooksForPieChart() {
  const apiUrl = "https://stephen-king-api.onrender.com/api/books";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const responseData = await response.json();
    const booksData = responseData.data;

    // Filter the books data to keep only the specific 7 books
    const filteredBooksData = booksData.filter(
      (book) =>
        book.Title === "Carrie" ||
        book.Title === "Salem's Lot" ||
        book.Title === "The Shining" ||
        book.Title === "Firestarter" ||
        book.Title === "Different Seasons" ||
        book.Title === "Pet Sematary" ||
        book.Title === "The Talisman"
    );

    drawPieChart(filteredBooksData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Function to draw pie chart
function drawPieChart(booksData) {
  const pieHeight = 400;
  const pieWidth = 400;
  const radius = Math.min(pieWidth, pieHeight) / 2 - 10;

  // Set up SVG for the pie chart
  const pieSvg = d3
    .select("#pie-chart")
    .append("svg")
    .attr("height", pieHeight)
    .attr("width", pieWidth)
    .append("g")
    .attr("transform", `translate(${pieWidth / 2}, ${pieHeight / 2})`);

  // Create pie chart data
  const pieData = d3.pie().value((d) => d.Pages)(booksData);

  const arc = d3.arc().outerRadius(radius).innerRadius(0);

  // Create and append arcs
  pieSvg
    .selectAll("arc")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => d3.schemeCategory10[i % 10]) // Different color for each pie slice
    .on("mouseover", function (event, d) {
      const tooltip = d3.select(".tooltip");
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(
          `${booksData[d.index].Title}<br>${booksData[d.index].Year} - ${
            booksData[d.index].Pages
          } Pages`
        ) // Display the book title, year, and pages
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 60 + "px")
        .style("background-color", "rgba(0, 0, 0, 0.8)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "5px");
    })
    .on("mouseout", function () {
      const tooltip = d3.select(".tooltip");
      tooltip.transition().duration(500).style("opacity", 0);
    });

  pieSvg
    .selectAll("text")
    .data(pieData)
    .enter()
    .append("text")
    .attr("transform", (d) => {
      const [x, y] = arc.centroid(d);
      return `translate(${x}, ${y})`;
    })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text((d, i) => `${booksData[i].Year}`)
    .attr("fill", "white");
}

// Fetch books data for the pie chart
fetchBooksForPieChart();
