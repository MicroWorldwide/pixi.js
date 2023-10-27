export type ArrayOr<T> = T | T[];

/**
 * Names of the parsers that are built into PixiJS.
 * Can be any of the following defaults:
 * - `loadJson`
 * - `loadSVG`
 * - `loadTextures`
 * - `loadTxt`
 * - `loadVideo`
 * - `loadWebFont`
 * or a custom parser name.
 * @memberof assets
 */
export type LoadParserName =
    | 'loadJson'
    | 'loadSVG'
    | 'loadTextures'
    | 'loadTxt'
    | 'loadVideo'
    | 'loadWebFont'
    | string;

/**
 * A fully resolved asset, with all the information needed to load it.
 * @memberof assets
 */
export interface ResolvedAsset<T=any>
{
    /** Aliases associated with asset */
    alias?: string[];
    /**
     * Please use `alias` instead.
     * @deprecated since 7.3.0
     */
    name?: string[];
    /** The URL or relative path to the asset */
    src?: string;
    /**
     * Please use `src` instead.
     * @deprecated since 7.3.0
     */
    srcs?: string;
    /** Optional data */
    data?: T;
    /** Format, usually the file extension */
    format?: string;
    /** An override that will ensure that the asset is loaded with a specific parser */
    loadParser?: LoadParserName;
    [key: string]: any;
}

/**
 * A fully resolved src, Glob patterns will not work here, and the src will be resolved to a single file.
 * @memberof assets
 */
// NOTE: Omit does not seem to work here
export type ResolvedSrc = Pick<ResolvedAsset, 'src' | 'srcs' | 'format' | 'loadParser' | 'data'> & {[key: string]: any;};

/**
 * A valid asset src. This can be a string, or a [ResolvedSrc]{@link assets.ResolvedSrc},
 * or an array of either.
 * @memberof assets
 */
export type AssetSrc = ArrayOr<string> | ArrayOr<ResolvedSrc>;

/**
 * An asset that has not been resolved yet.
 * @memberof assets
 */
export interface UnresolvedAsset<T=any> extends Omit<ResolvedAsset<T>, 'src' | 'srcs' | 'name' | 'alias'>
{
    /** Aliases associated with asset */
    alias?: ArrayOr<string>;
    /** The URL or relative path to the asset */
    src?: AssetSrc;
    /**
     * Please use `alias` instead.
     * @deprecated since 7.3.0
     */
    name?: ArrayOr<string>;
    /**
     * Please use `src` instead.
     * @deprecated since 7.3.0
     */
    srcs?: AssetSrc;
}

/**
 * The object version of an unresolved asset
 * @memberof assets
 */
export type UnresolvedAssetObject = Omit<UnresolvedAsset, 'name' | 'alias'>;

/**
 * Structure of a bundle found in a manifest file
 * @memberof assets
 */
export interface AssetsBundle
{
    /** The name of the bundle */
    name: string;
    /** The assets in the bundle */
    assets: UnresolvedAsset[] | Record<string, ArrayOr<string> | UnresolvedAssetObject>;
}

/**
 * The expected format of a manifest. This would normally be auto generated or made by the developer
 * @memberof assets
 */
export interface AssetsManifest
{
    /** array of bundles */
    bundles: AssetsBundle[];
}
