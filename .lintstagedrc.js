module.exports = {
    "**/*.js?(x)": (filenames) =>
        `yarn run lint --fix --file ${filenames.map((file) => file.split(process.cwd())[1]).join(" --file ")}`,
    "**/*.ts?(x)": (filenames) =>
        `yarn run lint --fix --file ${filenames.map((file) => file.split(process.cwd())[1]).join(" --file ")}`,
    "**/*": "yarn prettier --write --ignore-unknown",
}
