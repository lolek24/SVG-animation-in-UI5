sap.ui.define(
	[
		"./BaseController",
		"sap/m/MessageBox",
		"sap/ui/model/json/JSONModel",
		"d3",
		"d3-scale",
		"d3-selection",
		"d3-axis",
		"d3-shape"
	],
	function (BaseController, MessageBox, JSONModel, d3, d3scale, d3selection, d3axis, d3shape) {
		"use strict";

		return BaseController.extend("com.icon.controller.Main", {
			onInit: function () {
				var sPanelInfoText =
					"<div> This is a panel with a custom icon. The icon is defined in the customIcon.js file. The icon is added to the IconPool in the Component.js file. The icon is used in the Main.view.xml file. The icon is displayed in the Main.controller.js file. The icon is displayed</div>";
				this.JSONModel = new JSONModel({
					content: sPanelInfoText,
				});
				var Chart = this.chart();
				this.getView().byId("HTMLcontent").setContent(Chart.outerHTML);
				this.getView().setModel(this.JSONModel, "JSONModel");
			},
			chart: function () {
				// Declare the chart dimensions and margins.
				var width = 928;
				var height = 500;
				var marginTop = 20;
				var marginRight = 30;
				var marginBottom = 30;
				var marginLeft = 40;
				var aapl = [];

				// Declare the x (horizontal position) scale.
				var x = d3scale.scaleUtc(
					d3.extent(aapl, (d) => d.date),
					[marginLeft, width - marginRight]
				);

				// Declare the y (vertical position) scale.
				var y = d3scale.scaleLinear(
					[0, d3.max(aapl, (d) => d.close)],
					[height - marginBottom, marginTop]
				);

				// Declare the line generator.
				var line = d3shape
					.line()
					.x((d) => x(d.date))
					.y((d) => y(d.close));

				// Create the SVG container.
				var svg = d3selection
					.create("svg")
					.attr("width", width)
					.attr("height", height)
					.attr("viewBox", [0, 0, width, height])
					.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

				// Add the x-axis.
				svg
					.append("g")
					.attr("transform", `translate(0,${height - marginBottom})`)
					.call(
						d3axis
							.axisBottom(x)
							.ticks(width / 80)
							.tickSizeOuter(0)
					);

				// Add the y-axis, remove the domain line, add grid lines and a label.
				svg
					.append("g")
					.attr("transform", `translate(${marginLeft},0)`)
					.call(d3axis.axisLeft(y).ticks(height / 40))
					.call((g) => g.select(".domain").remove())
					.call((g) =>
						g
							.selectAll(".tick line")
							.clone()
							.attr("x2", width - marginLeft - marginRight)
							.attr("stroke-opacity", 0.1)
					)
					.call((g) =>
						g
							.append("text")
							.attr("x", -marginLeft)
							.attr("y", 10)
							.attr("fill", "currentColor")
							.attr("text-anchor", "start")
							.text("↑ Daily close ($)")
					);

				// Append a path for the line.
				svg
					.append("path")
					.attr("fill", "none")
					.attr("stroke", "steelblue")
					.attr("stroke-width", 1.5)
					.attr("d", line(aapl));

				return svg.node();
			},

			AfterRendering: function () {
				/*global d3*/
				var svg = d3
					.select("#container")
					.append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr(
						"transform",
						"translate(" + margin.left + "," + margin.top + ")"
					);
			},

			onExit: function () {},
			sayHello: function () {
				MessageBox.show("Hello World!");
			},
		});
	}
);
