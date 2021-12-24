const lintFiles = (filenames) => {
    filenames.map((file) => console.log("File: ", process.cwd(), file, file.split(process.cwd().replace(/\\/g, "/"))))
    return `yarn run lint --fix --file ${filenames
        .map((file) => file.split(process.cwd().replace(/\\/g, "/"))[1])
        .join(" --file ")}`
}

module.exports = {
    "**/*.js?(x)": lintFiles,
    "**/*.ts?(x)": lintFiles,
    "**/*": "yarn prettier --write --ignore-unknown",
}
