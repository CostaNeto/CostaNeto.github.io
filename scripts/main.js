const windowHeight = window.innerHeight;
const contents = document.querySelectorAll(".page-content");
const homeMessage = document.querySelector(".home-message-container");
const projects = document.querySelectorAll(".project");
const fields = document.querySelectorAll(".field");
const aboutHeader = document.querySelector(".about-header");
const countryCountainer = document.querySelector(".country-container");
const countries = document.querySelectorAll(".country");
const phone = document.querySelector(".phone");
const projectContainer = document.querySelector(".projects");

// HOME------------------------------------------
// home message transition
const revealOptions = {
	threshold: 0,
};

const reveal = new IntersectionObserver(function (entries) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			entry.target.classList.remove("reveal");
		} else {
			entry.target.classList.add("reveal");
		}
	});
}, revealOptions);

reveal.observe(homeMessage);

// change opacity of home page and banners
$(window).on("scroll", function () {
	var scrollTop = $(this).scrollTop();
	$("#home").css({
		opacity: function () {
			var homeHeight = $(this).height(),
				opacity = (homeHeight - scrollTop) / homeHeight;
			return opacity;
		},
	});

	contents.forEach((content) => {
		var contentHeight = content.getBoundingClientRect().top;
		if (content.id === "home" || content.id === "contact") {
			return;
		} else {
			var banner = content.previousElementSibling.id;
			if (contentHeight <= windowHeight) {
				changeOpacity(banner, contentHeight);
			} else {
				$(`#${banner}`).css({
					opacity: 1,
				});
			}
		}
	});
});

const changeOpacity = (element, elemHeight) => {
	$(`#${element}`).css({
		opacity: function () {
			var opacity = (windowHeight - (windowHeight - elemHeight)) / windowHeight;
			return opacity;
		},
	});
};
// HOME------------------------------------------

// PORTFOLIO------------------------------------
// reveal projects
const itemReveal = new IntersectionObserver(function (
	entries,
	portfolioReveal
) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		} else {
			entry.target.classList.add("reveal");
			portfolioReveal.unobserve(entry.target);
		}
	});
},
revealOptions);

projects.forEach((project) => {
	itemReveal.observe(project);
});

// selecting the project icon on click
const appDetails = [
	{
		id: "weather-app",
		title: "Weather App",
		description:
			"Provides current, hourly and 3-days forecast, and AQI details.",
		link: "https://github.com/CostaNeto/Weather",
		video: "demo/demo-weather.mp4",
	},
	{
		id: "todo-app",
		title: "Todo App",
		description: "Helps you organize your day.",
		link: "https://github.com/CostaNeto/ToDo",
		video: "demo/demo-todo.mp4",
	},
	{
		id: "colorizer-app",
		title: "Colorizer App",
		description:
			"RGB Colors and Supercars. Play with both through this fun app!",
		link: "https://github.com/CostaNeto/OptionMenuColorizer",
		video: "demo/demo-colorizer.mp4",
	},
	{
		id: "story-app",
		title: "A New World",
		description:
			"A seed and late for work. Play a game where your choices matter.",
		link: "https://github.com/CostaNeto/A_New_World",
		video: "demo/demo-new-world.mp4",
	},
];

$(".project").on("click", function () {
	$(".project").removeClass("active");
	$(this).addClass("active");

	// each project activates its own description and demo video
	const id = $(this).attr("id");
	appDetails.forEach((app) => {
		if (app.id === id) {
			changedetails(app.title, app.description, app.link, app.video);
		}
	});

	// show project link button
	$("#description").children("div").css("display", "flex");
});

const changedetails = (appTitle, appDescription, appLink, appVideo) => {
	// app name
	$("#app-title")
		.fadeOut(function () {
			$(this).text(appTitle);
		})
		.fadeIn();

	// app description
	$("#app-description")
		.fadeOut(function () {
			$(this).text(appDescription);
		})
		.fadeIn();

	// app GitHub link
	$("#app-link").attr({ href: appLink, target: "blank" });

	// demo video
	$("#app-demo").attr("src", appVideo);
};
// PORTFOLIO------------------------------------

// TECHNOLOGIES---------------------------------
fields.forEach((field) => {
	itemReveal.observe(field);
});
itemReveal.observe(phone);
itemReveal.observe(projectContainer);
// TECHNOLOGIES---------------------------------

// ABOUT----------------------------------------
itemReveal.observe(aboutHeader);

const countryRevealOptions = {
	threshold: 0.7,
};

const countryReveal = new IntersectionObserver(function (
	entries,
	countryReveal
) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		} else {
			countries.forEach((country) => country.classList.add("reveal"));
			countryReveal.unobserve(entry.target);
		}
	});
},
countryRevealOptions);

if (window.innerWidth < 1024) {
	itemReveal.observe(countryCountainer);
} else {
	countryReveal.observe(countryCountainer);
}
// ABOUT----------------------------------------

// CONTACT--------------------------------------
// CONTACT--------------------------------------
