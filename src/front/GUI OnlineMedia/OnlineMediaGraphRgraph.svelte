<script>
    import { onMount } from "svelte";

    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    import NotFound from "../NotFound.svelte";

    const BASE_API_PATH = "/api/v1";

    let onlinemediaStats = [];

    let platform_yearGraph = [];
    let priceGraph = [];
    let markGraph = [];
    let audienceGraph = [];

    async function loadGraph() {
        const res = await fetch(BASE_API_PATH + "/onlinemedia-stats");
        onlinemediaStats = await res.json();

        if (res.ok) {
            onlinemediaStats.forEach((stat) => {
                platform_yearGraph.push(stat.online_media + "/" + stat.year);
                priceGraph.push(stat.account_price_per_month);
                markGraph.push(stat.mark);
                audienceGraph.push(stat.audience);
            });
        }

        // Some default variables. These margins are not all hard-and-fast
        // values - some are increased and some are reduced for each chart.
        let marginLeft = 60;
        let marginRight = 25;
        let marginTop = 45;
        let marginBottom = 65;
        let marginInner = 20;

        // This is the same for each chart
        let yaxisScaleMax = 35;

        // How many animation frames there are
        let frames = 20;

        // Used later
        let state = {};

        // Here are the three datasets for the chart
        let data = [priceGraph, markGraph, audienceGraph];

        // The colors for the bars
        let colors = [
            "Gradient(#696:#0f0:#0f0)",
            "Gradient(#966:#f00:#f00)",
            "Gradient(#669:blue:blue)",
        ];

        // And the X axis labels for the chart
        let xaxisLabels = [
            "Netflix/2020",
            "Disney Plus/2020",
            "Amazon/2020",
            "Rakuten/2020",
            "HBO/2020",
        ];

        // Draw the first bar chart
        function draw1() {
            state.bar1 = new RGraph.Bar({
                id: "cvs",
                data: data[0],
                options: {
                    
                    // These few properties set the chart to be a 3D Bar chart and turn off
                    // the 3D axes that are drawn.
                    variant: "3d",
                    variantThreedYaxis: false,
                    variantThreedXaxis: false,

                    colorsStroke: "rgba(0,0,0,0)",
                    colors: [colors[2]],

                    // The background grid is only enabled on this chart - the
                    // bar chart at the back
                    backgroundGridColor: "#ccc",
                    backgroundGridHlinesCount: 5,
                    backgroundGridVlinesCount: 14,

                    // Set the margins based on the values that are defined above
                    marginBottom: marginBottom,
                    marginTop: marginTop,
                    marginLeft: marginLeft,
                    marginRight: marginRight,
                    marginInner: marginInner,

                    yaxisScaleMax: yaxisScaleMax,
                    xaxis: false,
                    yaxis: false,
                    yaxisScale: false,
                },

                // Use the grow() effect. The function that gets called at the
                // end of the effect (the draw2() function) starts drawing/animating
                // the second set of bars.
            });

            if (RGraph.ISIE) {
                state.bar1.draw();
                draw2();
            } else {
                state.bar1.grow({ frames: frames }, draw2);
            }
        }

        // This function draws the second bar chart. It's called when the grow()
        // effect of the first bar chart completes.
        function draw2() {
            state.bar2 = new RGraph.Bar({
                id: "cvs",
                data: data[1],
                options: {
                    // Stipulate 3d but no 3D axes
                    variant: "3d",
                    variantThreedYaxis: false,
                    variantThreedXaxis: false,

                    colorsStroke: "rgba(0,0,0,0)",
                    colors: [colors[1]],

                    // No background grid or X/Y labels for the second and third charts
                    backgroundGrid: false,
                    yaxisLabels: false,
                    xaxisLabels: [],

                    // The default margins are increased on one side and reduced on
                    // the other in order to move the chart to the left a little and
                    // enhance the perception of depth.
                    marginBottom: marginBottom - 10,
                    marginTop: marginTop + 10,
                    marginLeft: marginLeft - 25,
                    marginRight: marginRight + 25,
                    marginInner: marginInner,

                    yaxisScaleMax: yaxisScaleMax,
                    xaxis: false,
                    yaxis: false,
                    yaxisScale: false,
                },

                // Use the grow() effect again and when it's done the draw3() function
                // is called.
            });

            if (RGraph.ISIE) {
                state.bar2.draw();
                draw3();
            } else {
                state.bar2.grow({ frames: frames }, draw3);
            }
        }

        // This function draws the third bar chart
        function draw3() {
            state.bar3 = new RGraph.Bar({
                id: "cvs",
                data: data[2],
                options: {
                    // Set the chart to be 3D but without any axes
                    variant: "3d",
                    variantThreedYaxis: false,
                    variantThreedXaxis: false,

                    colorsStroke: "rgba(0,0,0,0)",
                    colors: [colors[0]],

                    // Now that we're drawing the chart that's "at the front" the X axis labels can be drawn
                    xaxisLabels: xaxisLabels,

                    backgroundGrid: false,

                    // Add and subtract from the default margins in order to move the
                    // chart to the left
                    marginTop: marginTop + 20,
                    marginBottom: marginBottom - 20,
                    marginLeft: marginLeft - 40,
                    marginRight: marginRight + 50,
                    marginInner: marginInner,

                    yaxisScaleMax: yaxisScaleMax,
                    xaxis: false,
                    yaxis: false,
                    yaxisScale: false,
                },
                // Use the grow() effect to show the chart but this time with no callback
                // function because there's no subsequent chart to draw.
                //
                // The responsive function is new as of October 2019 and allows you to specify
                // different settings for different screen sizes. Remember that you may need
                //to add settings to the chart again if you remove them for some sizes.
            });

            if (RGraph.ISIE) {
                state.bar3.draw();
            } else {
                state.bar3.grow({ frames: frames });
            }

            state.bar3.responsive([
                {
                    maxWidth: null,
                    width: 650,
                    height: 300,
                    options: {
                        xaxisLabels: [
                            "Netflix/2020",
                            "Disney Plus/2020",
                            "Amazon/2020",
                            "Rakuten/2020",
                            "HBO/2020",
                        ],
                        textSize: 12,
                        marginInner: marginInner,
                    },
                    callback: function () {
                        state.bar1.set("marginInner", 20);
                        state.bar2.set("marginInner", 20);
                        setTimeout(function () {
                            state.yaxisObj.x = 635;
                            state.yaxisObj.set("textSize", 12);
                            RGraph.redraw();
                        }, 250);
                    },
                },
                {
                    maxWidth: 900,
                    width: 450,
                    height: 200,
                    options: {
                        xaxisLabels: [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                        ],
                        textSize: 8,
                        marginInner: 10,
                    },
                    callback: function () {
                        state.bar1.set("marginInner", 10);
                        state.bar2.set("marginInner", 10);
                        state.yaxisObj.x = 435;
                        state.yaxisObj.set("textSize", 8);
                        RGraph.redraw();
                    },
                },
            ]);
        }

        // Initiate the drawing of the first chart. The second and then the
        // third charts are initiated by the prior charts animation callback
        // function. This has to be placed before the Y axis.
        draw1();

        // This drawing API Y axis is used to show the Y axis labels on the
        // right-hand-side - though the actual axis is not shown - just the labels.
        

        state.yaxisObj  = new RGraph.Drawing.YAxis({
            id: "cvs",
            x: 635,
            options: {
                yaxisColor: "rgba(0,0,0,0)",
                textColor: "black",
                marginTop: 40,
                marginBottom: 70,
                yaxisScaleMax: 35,
                yaxisPosition: "right",
            },
        }).draw();
    }
</script>

<svelte:head>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.common.core.js"></script>
    <script
        src="https://www.rgraph.net/libraries/src/RGraph.bar.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <p class="rgraph-description" align = "center">Gráfico de Plataformas RGraph  </p>
    <p class="rgraph-description"  align = "center" style="color:white;">. </p>
    <p class="rgraph-description" align = "center" style="color:blue;">Precio por subscripción mensual (€) </p>
    <p class="rgraph-description" align = "center" style="color:red;">Nota en Google Play España ★★★☆☆</p>
    <p class="rgraph-description" align = "center" style="color:green;">Audiencia (Millones) </p>
    <div  align = "center">
        <canvas id="cvs" width="500" height="400"> [No canvas support] </canvas>
    </div>
</main>
