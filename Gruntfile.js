"use strict";

module.exports = function (grunt) {

	require("load-grunt-tasks")(grunt);

	grunt.initConfig({

		// clean build artifacts
		clean: {
			bower: {
				src: "bower_components",
				dot: true
			},
			package: {
				src: "package",
				dot: true
			},
			dist: {
				src: "dist",
				dot: true
			}
		},

		// install bower dependencies
		bower: {
			install: {
				options: {
					targetDir: "package/lib",
					verbose: true,
					layout: function(type, component, source) {
						grunt.log.ok("type: %s, component: %s, source: %s", type, component, source);
						var tokens = source.split("/");
						var end = tokens.length < 3 ? tokens.length : tokens.length - 1;
						var layout = tokens.slice(1, end).join("/");
						grunt.log.ok(layout);
						return layout;
					}
				}
			}
		},

		// compile less to css
		less: {
			app: {
				options: {
					compress: true,
					cleancss: true
				},
				files: [
					{
						cwd: "app",
						src: ["less/*.less"],
						dest: "package/css/",
						ext: ".css",
						flatten: true,
						expand: true
					}
				]
			}
		},

		// package artifacts
		copy: {
			package: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: "app",
						dest: "package",
						src: [
                            "*.html",
							"images/icon16x16.png",
							"images/icon48x48.png",
        					"images/icon128x128.png",
							"javascript/*.js",
							"manifest.json"
						]
					}
				]
			}
		},

		// compress artifacts for distribution
		compress: {
			dist: {
				options: {
					archive: function () {
						var manifest = grunt.file.readJSON("package/manifest.json");
						return "dist/google-cloud-console-production-warning-" + manifest.version + ".zip";
					}
				},
				files: [
					{
						expand: true,
						cwd: "package/",
						src: ["**"],
						dest: ""
					}
				]
			}
		},

		// watch files for changes
		watch: {
			bower: {
				files: ["bower.json"],
				tasks: ["bower", "copy"]
			},
			html: {
				files: ["app/*.html"],
				tasks: ["copy"]
			},
			manifest: {
				files: ["app/manifest.json"],
				tasks: ["copy"]
			},
			less: {
				files: ["app/less/*.less"],
				tasks: ["less", "copy"]
			},
			images: {
				files: ["app/images/{,*/}*.*"],
				tasks: ["copy"]
			},
			js: {
				files: ["app/javascript/{,*/}*.js"],
				tasks: ["copy"]
			}
		}
	});

	grunt.registerTask("default", [
		"clean",
		"bower",
		"less",
		"copy",
		"watch"
	]);

	grunt.registerTask("dist", [
		"clean",
		"bower",
		"less",
		"copy",
		"compress"
	]);
};
