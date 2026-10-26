import { dirname } from "path"
import { fileURLToPath } from "url"
import { createRequire } from "module"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const compat = new FlatCompat({
	baseDirectory: __dirname,
	// Résout les plugins comme eslint-config-next les attend (react-hooks v5, son propre
	// node_modules). Sans ça, FlatCompat prend le react-hooks v6 de la racine, dont les configs
	// se référencent elles-mêmes : « Converting circular structure to JSON ».
	resolvePluginsRelativeTo: dirname(
		require.resolve("eslint-config-next/package.json"),
	),
})

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
]

export default eslintConfig
