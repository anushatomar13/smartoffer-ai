
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Negotiation
 * 
 */
export type Negotiation = $Result.DefaultSelection<Prisma.$NegotiationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Negotiations
 * const negotiations = await prisma.negotiation.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Negotiations
   * const negotiations = await prisma.negotiation.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.negotiation`: Exposes CRUD operations for the **Negotiation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Negotiations
    * const negotiations = await prisma.negotiation.findMany()
    * ```
    */
  get negotiation(): Prisma.NegotiationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Negotiation: 'Negotiation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "negotiation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Negotiation: {
        payload: Prisma.$NegotiationPayload<ExtArgs>
        fields: Prisma.NegotiationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NegotiationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NegotiationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>
          }
          findFirst: {
            args: Prisma.NegotiationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NegotiationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>
          }
          findMany: {
            args: Prisma.NegotiationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>[]
          }
          create: {
            args: Prisma.NegotiationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>
          }
          createMany: {
            args: Prisma.NegotiationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NegotiationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>[]
          }
          delete: {
            args: Prisma.NegotiationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>
          }
          update: {
            args: Prisma.NegotiationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>
          }
          deleteMany: {
            args: Prisma.NegotiationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NegotiationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NegotiationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>[]
          }
          upsert: {
            args: Prisma.NegotiationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegotiationPayload>
          }
          aggregate: {
            args: Prisma.NegotiationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNegotiation>
          }
          groupBy: {
            args: Prisma.NegotiationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NegotiationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NegotiationCountArgs<ExtArgs>
            result: $Utils.Optional<NegotiationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    negotiation?: NegotiationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Negotiation
   */

  export type AggregateNegotiation = {
    _count: NegotiationCountAggregateOutputType | null
    _min: NegotiationMinAggregateOutputType | null
    _max: NegotiationMaxAggregateOutputType | null
  }

  export type NegotiationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    originalText: string | null
    counterOffer: string | null
    toneTips: string | null
    createdAt: Date | null
  }

  export type NegotiationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    originalText: string | null
    counterOffer: string | null
    toneTips: string | null
    createdAt: Date | null
  }

  export type NegotiationCountAggregateOutputType = {
    id: number
    userId: number
    originalText: number
    counterOffer: number
    toneTips: number
    createdAt: number
    _all: number
  }


  export type NegotiationMinAggregateInputType = {
    id?: true
    userId?: true
    originalText?: true
    counterOffer?: true
    toneTips?: true
    createdAt?: true
  }

  export type NegotiationMaxAggregateInputType = {
    id?: true
    userId?: true
    originalText?: true
    counterOffer?: true
    toneTips?: true
    createdAt?: true
  }

  export type NegotiationCountAggregateInputType = {
    id?: true
    userId?: true
    originalText?: true
    counterOffer?: true
    toneTips?: true
    createdAt?: true
    _all?: true
  }

  export type NegotiationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Negotiation to aggregate.
     */
    where?: NegotiationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Negotiations to fetch.
     */
    orderBy?: NegotiationOrderByWithRelationInput | NegotiationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NegotiationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Negotiations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Negotiations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Negotiations
    **/
    _count?: true | NegotiationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NegotiationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NegotiationMaxAggregateInputType
  }

  export type GetNegotiationAggregateType<T extends NegotiationAggregateArgs> = {
        [P in keyof T & keyof AggregateNegotiation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNegotiation[P]>
      : GetScalarType<T[P], AggregateNegotiation[P]>
  }




  export type NegotiationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NegotiationWhereInput
    orderBy?: NegotiationOrderByWithAggregationInput | NegotiationOrderByWithAggregationInput[]
    by: NegotiationScalarFieldEnum[] | NegotiationScalarFieldEnum
    having?: NegotiationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NegotiationCountAggregateInputType | true
    _min?: NegotiationMinAggregateInputType
    _max?: NegotiationMaxAggregateInputType
  }

  export type NegotiationGroupByOutputType = {
    id: string
    userId: string
    originalText: string
    counterOffer: string
    toneTips: string
    createdAt: Date
    _count: NegotiationCountAggregateOutputType | null
    _min: NegotiationMinAggregateOutputType | null
    _max: NegotiationMaxAggregateOutputType | null
  }

  type GetNegotiationGroupByPayload<T extends NegotiationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NegotiationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NegotiationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NegotiationGroupByOutputType[P]>
            : GetScalarType<T[P], NegotiationGroupByOutputType[P]>
        }
      >
    >


  export type NegotiationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalText?: boolean
    counterOffer?: boolean
    toneTips?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["negotiation"]>

  export type NegotiationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalText?: boolean
    counterOffer?: boolean
    toneTips?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["negotiation"]>

  export type NegotiationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalText?: boolean
    counterOffer?: boolean
    toneTips?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["negotiation"]>

  export type NegotiationSelectScalar = {
    id?: boolean
    userId?: boolean
    originalText?: boolean
    counterOffer?: boolean
    toneTips?: boolean
    createdAt?: boolean
  }

  export type NegotiationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "originalText" | "counterOffer" | "toneTips" | "createdAt", ExtArgs["result"]["negotiation"]>

  export type $NegotiationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Negotiation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      originalText: string
      counterOffer: string
      toneTips: string
      createdAt: Date
    }, ExtArgs["result"]["negotiation"]>
    composites: {}
  }

  type NegotiationGetPayload<S extends boolean | null | undefined | NegotiationDefaultArgs> = $Result.GetResult<Prisma.$NegotiationPayload, S>

  type NegotiationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NegotiationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NegotiationCountAggregateInputType | true
    }

  export interface NegotiationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Negotiation'], meta: { name: 'Negotiation' } }
    /**
     * Find zero or one Negotiation that matches the filter.
     * @param {NegotiationFindUniqueArgs} args - Arguments to find a Negotiation
     * @example
     * // Get one Negotiation
     * const negotiation = await prisma.negotiation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NegotiationFindUniqueArgs>(args: SelectSubset<T, NegotiationFindUniqueArgs<ExtArgs>>): Prisma__NegotiationClient<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Negotiation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NegotiationFindUniqueOrThrowArgs} args - Arguments to find a Negotiation
     * @example
     * // Get one Negotiation
     * const negotiation = await prisma.negotiation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NegotiationFindUniqueOrThrowArgs>(args: SelectSubset<T, NegotiationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NegotiationClient<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Negotiation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegotiationFindFirstArgs} args - Arguments to find a Negotiation
     * @example
     * // Get one Negotiation
     * const negotiation = await prisma.negotiation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NegotiationFindFirstArgs>(args?: SelectSubset<T, NegotiationFindFirstArgs<ExtArgs>>): Prisma__NegotiationClient<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Negotiation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegotiationFindFirstOrThrowArgs} args - Arguments to find a Negotiation
     * @example
     * // Get one Negotiation
     * const negotiation = await prisma.negotiation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NegotiationFindFirstOrThrowArgs>(args?: SelectSubset<T, NegotiationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NegotiationClient<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Negotiations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegotiationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Negotiations
     * const negotiations = await prisma.negotiation.findMany()
     * 
     * // Get first 10 Negotiations
     * const negotiations = await prisma.negotiation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const negotiationWithIdOnly = await prisma.negotiation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NegotiationFindManyArgs>(args?: SelectSubset<T, NegotiationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Negotiation.
     * @param {NegotiationCreateArgs} args - Arguments to create a Negotiation.
     * @example
     * // Create one Negotiation
     * const Negotiation = await prisma.negotiation.create({
     *   data: {
     *     // ... data to create a Negotiation
     *   }
     * })
     * 
     */
    create<T extends NegotiationCreateArgs>(args: SelectSubset<T, NegotiationCreateArgs<ExtArgs>>): Prisma__NegotiationClient<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Negotiations.
     * @param {NegotiationCreateManyArgs} args - Arguments to create many Negotiations.
     * @example
     * // Create many Negotiations
     * const negotiation = await prisma.negotiation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NegotiationCreateManyArgs>(args?: SelectSubset<T, NegotiationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Negotiations and returns the data saved in the database.
     * @param {NegotiationCreateManyAndReturnArgs} args - Arguments to create many Negotiations.
     * @example
     * // Create many Negotiations
     * const negotiation = await prisma.negotiation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Negotiations and only return the `id`
     * const negotiationWithIdOnly = await prisma.negotiation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NegotiationCreateManyAndReturnArgs>(args?: SelectSubset<T, NegotiationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Negotiation.
     * @param {NegotiationDeleteArgs} args - Arguments to delete one Negotiation.
     * @example
     * // Delete one Negotiation
     * const Negotiation = await prisma.negotiation.delete({
     *   where: {
     *     // ... filter to delete one Negotiation
     *   }
     * })
     * 
     */
    delete<T extends NegotiationDeleteArgs>(args: SelectSubset<T, NegotiationDeleteArgs<ExtArgs>>): Prisma__NegotiationClient<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Negotiation.
     * @param {NegotiationUpdateArgs} args - Arguments to update one Negotiation.
     * @example
     * // Update one Negotiation
     * const negotiation = await prisma.negotiation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NegotiationUpdateArgs>(args: SelectSubset<T, NegotiationUpdateArgs<ExtArgs>>): Prisma__NegotiationClient<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Negotiations.
     * @param {NegotiationDeleteManyArgs} args - Arguments to filter Negotiations to delete.
     * @example
     * // Delete a few Negotiations
     * const { count } = await prisma.negotiation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NegotiationDeleteManyArgs>(args?: SelectSubset<T, NegotiationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Negotiations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegotiationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Negotiations
     * const negotiation = await prisma.negotiation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NegotiationUpdateManyArgs>(args: SelectSubset<T, NegotiationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Negotiations and returns the data updated in the database.
     * @param {NegotiationUpdateManyAndReturnArgs} args - Arguments to update many Negotiations.
     * @example
     * // Update many Negotiations
     * const negotiation = await prisma.negotiation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Negotiations and only return the `id`
     * const negotiationWithIdOnly = await prisma.negotiation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NegotiationUpdateManyAndReturnArgs>(args: SelectSubset<T, NegotiationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Negotiation.
     * @param {NegotiationUpsertArgs} args - Arguments to update or create a Negotiation.
     * @example
     * // Update or create a Negotiation
     * const negotiation = await prisma.negotiation.upsert({
     *   create: {
     *     // ... data to create a Negotiation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Negotiation we want to update
     *   }
     * })
     */
    upsert<T extends NegotiationUpsertArgs>(args: SelectSubset<T, NegotiationUpsertArgs<ExtArgs>>): Prisma__NegotiationClient<$Result.GetResult<Prisma.$NegotiationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Negotiations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegotiationCountArgs} args - Arguments to filter Negotiations to count.
     * @example
     * // Count the number of Negotiations
     * const count = await prisma.negotiation.count({
     *   where: {
     *     // ... the filter for the Negotiations we want to count
     *   }
     * })
    **/
    count<T extends NegotiationCountArgs>(
      args?: Subset<T, NegotiationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NegotiationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Negotiation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegotiationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NegotiationAggregateArgs>(args: Subset<T, NegotiationAggregateArgs>): Prisma.PrismaPromise<GetNegotiationAggregateType<T>>

    /**
     * Group by Negotiation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegotiationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NegotiationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NegotiationGroupByArgs['orderBy'] }
        : { orderBy?: NegotiationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NegotiationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNegotiationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Negotiation model
   */
  readonly fields: NegotiationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Negotiation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NegotiationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Negotiation model
   */
  interface NegotiationFieldRefs {
    readonly id: FieldRef<"Negotiation", 'String'>
    readonly userId: FieldRef<"Negotiation", 'String'>
    readonly originalText: FieldRef<"Negotiation", 'String'>
    readonly counterOffer: FieldRef<"Negotiation", 'String'>
    readonly toneTips: FieldRef<"Negotiation", 'String'>
    readonly createdAt: FieldRef<"Negotiation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Negotiation findUnique
   */
  export type NegotiationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * Filter, which Negotiation to fetch.
     */
    where: NegotiationWhereUniqueInput
  }

  /**
   * Negotiation findUniqueOrThrow
   */
  export type NegotiationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * Filter, which Negotiation to fetch.
     */
    where: NegotiationWhereUniqueInput
  }

  /**
   * Negotiation findFirst
   */
  export type NegotiationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * Filter, which Negotiation to fetch.
     */
    where?: NegotiationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Negotiations to fetch.
     */
    orderBy?: NegotiationOrderByWithRelationInput | NegotiationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Negotiations.
     */
    cursor?: NegotiationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Negotiations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Negotiations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Negotiations.
     */
    distinct?: NegotiationScalarFieldEnum | NegotiationScalarFieldEnum[]
  }

  /**
   * Negotiation findFirstOrThrow
   */
  export type NegotiationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * Filter, which Negotiation to fetch.
     */
    where?: NegotiationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Negotiations to fetch.
     */
    orderBy?: NegotiationOrderByWithRelationInput | NegotiationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Negotiations.
     */
    cursor?: NegotiationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Negotiations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Negotiations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Negotiations.
     */
    distinct?: NegotiationScalarFieldEnum | NegotiationScalarFieldEnum[]
  }

  /**
   * Negotiation findMany
   */
  export type NegotiationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * Filter, which Negotiations to fetch.
     */
    where?: NegotiationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Negotiations to fetch.
     */
    orderBy?: NegotiationOrderByWithRelationInput | NegotiationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Negotiations.
     */
    cursor?: NegotiationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Negotiations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Negotiations.
     */
    skip?: number
    distinct?: NegotiationScalarFieldEnum | NegotiationScalarFieldEnum[]
  }

  /**
   * Negotiation create
   */
  export type NegotiationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * The data needed to create a Negotiation.
     */
    data: XOR<NegotiationCreateInput, NegotiationUncheckedCreateInput>
  }

  /**
   * Negotiation createMany
   */
  export type NegotiationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Negotiations.
     */
    data: NegotiationCreateManyInput | NegotiationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Negotiation createManyAndReturn
   */
  export type NegotiationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * The data used to create many Negotiations.
     */
    data: NegotiationCreateManyInput | NegotiationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Negotiation update
   */
  export type NegotiationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * The data needed to update a Negotiation.
     */
    data: XOR<NegotiationUpdateInput, NegotiationUncheckedUpdateInput>
    /**
     * Choose, which Negotiation to update.
     */
    where: NegotiationWhereUniqueInput
  }

  /**
   * Negotiation updateMany
   */
  export type NegotiationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Negotiations.
     */
    data: XOR<NegotiationUpdateManyMutationInput, NegotiationUncheckedUpdateManyInput>
    /**
     * Filter which Negotiations to update
     */
    where?: NegotiationWhereInput
    /**
     * Limit how many Negotiations to update.
     */
    limit?: number
  }

  /**
   * Negotiation updateManyAndReturn
   */
  export type NegotiationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * The data used to update Negotiations.
     */
    data: XOR<NegotiationUpdateManyMutationInput, NegotiationUncheckedUpdateManyInput>
    /**
     * Filter which Negotiations to update
     */
    where?: NegotiationWhereInput
    /**
     * Limit how many Negotiations to update.
     */
    limit?: number
  }

  /**
   * Negotiation upsert
   */
  export type NegotiationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * The filter to search for the Negotiation to update in case it exists.
     */
    where: NegotiationWhereUniqueInput
    /**
     * In case the Negotiation found by the `where` argument doesn't exist, create a new Negotiation with this data.
     */
    create: XOR<NegotiationCreateInput, NegotiationUncheckedCreateInput>
    /**
     * In case the Negotiation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NegotiationUpdateInput, NegotiationUncheckedUpdateInput>
  }

  /**
   * Negotiation delete
   */
  export type NegotiationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
    /**
     * Filter which Negotiation to delete.
     */
    where: NegotiationWhereUniqueInput
  }

  /**
   * Negotiation deleteMany
   */
  export type NegotiationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Negotiations to delete
     */
    where?: NegotiationWhereInput
    /**
     * Limit how many Negotiations to delete.
     */
    limit?: number
  }

  /**
   * Negotiation without action
   */
  export type NegotiationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negotiation
     */
    select?: NegotiationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Negotiation
     */
    omit?: NegotiationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const NegotiationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    originalText: 'originalText',
    counterOffer: 'counterOffer',
    toneTips: 'toneTips',
    createdAt: 'createdAt'
  };

  export type NegotiationScalarFieldEnum = (typeof NegotiationScalarFieldEnum)[keyof typeof NegotiationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type NegotiationWhereInput = {
    AND?: NegotiationWhereInput | NegotiationWhereInput[]
    OR?: NegotiationWhereInput[]
    NOT?: NegotiationWhereInput | NegotiationWhereInput[]
    id?: StringFilter<"Negotiation"> | string
    userId?: StringFilter<"Negotiation"> | string
    originalText?: StringFilter<"Negotiation"> | string
    counterOffer?: StringFilter<"Negotiation"> | string
    toneTips?: StringFilter<"Negotiation"> | string
    createdAt?: DateTimeFilter<"Negotiation"> | Date | string
  }

  export type NegotiationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    originalText?: SortOrder
    counterOffer?: SortOrder
    toneTips?: SortOrder
    createdAt?: SortOrder
  }

  export type NegotiationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NegotiationWhereInput | NegotiationWhereInput[]
    OR?: NegotiationWhereInput[]
    NOT?: NegotiationWhereInput | NegotiationWhereInput[]
    userId?: StringFilter<"Negotiation"> | string
    originalText?: StringFilter<"Negotiation"> | string
    counterOffer?: StringFilter<"Negotiation"> | string
    toneTips?: StringFilter<"Negotiation"> | string
    createdAt?: DateTimeFilter<"Negotiation"> | Date | string
  }, "id">

  export type NegotiationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    originalText?: SortOrder
    counterOffer?: SortOrder
    toneTips?: SortOrder
    createdAt?: SortOrder
    _count?: NegotiationCountOrderByAggregateInput
    _max?: NegotiationMaxOrderByAggregateInput
    _min?: NegotiationMinOrderByAggregateInput
  }

  export type NegotiationScalarWhereWithAggregatesInput = {
    AND?: NegotiationScalarWhereWithAggregatesInput | NegotiationScalarWhereWithAggregatesInput[]
    OR?: NegotiationScalarWhereWithAggregatesInput[]
    NOT?: NegotiationScalarWhereWithAggregatesInput | NegotiationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Negotiation"> | string
    userId?: StringWithAggregatesFilter<"Negotiation"> | string
    originalText?: StringWithAggregatesFilter<"Negotiation"> | string
    counterOffer?: StringWithAggregatesFilter<"Negotiation"> | string
    toneTips?: StringWithAggregatesFilter<"Negotiation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Negotiation"> | Date | string
  }

  export type NegotiationCreateInput = {
    id?: string
    userId: string
    originalText: string
    counterOffer: string
    toneTips: string
    createdAt?: Date | string
  }

  export type NegotiationUncheckedCreateInput = {
    id?: string
    userId: string
    originalText: string
    counterOffer: string
    toneTips: string
    createdAt?: Date | string
  }

  export type NegotiationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalText?: StringFieldUpdateOperationsInput | string
    counterOffer?: StringFieldUpdateOperationsInput | string
    toneTips?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NegotiationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalText?: StringFieldUpdateOperationsInput | string
    counterOffer?: StringFieldUpdateOperationsInput | string
    toneTips?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NegotiationCreateManyInput = {
    id?: string
    userId: string
    originalText: string
    counterOffer: string
    toneTips: string
    createdAt?: Date | string
  }

  export type NegotiationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalText?: StringFieldUpdateOperationsInput | string
    counterOffer?: StringFieldUpdateOperationsInput | string
    toneTips?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NegotiationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalText?: StringFieldUpdateOperationsInput | string
    counterOffer?: StringFieldUpdateOperationsInput | string
    toneTips?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NegotiationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalText?: SortOrder
    counterOffer?: SortOrder
    toneTips?: SortOrder
    createdAt?: SortOrder
  }

  export type NegotiationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalText?: SortOrder
    counterOffer?: SortOrder
    toneTips?: SortOrder
    createdAt?: SortOrder
  }

  export type NegotiationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalText?: SortOrder
    counterOffer?: SortOrder
    toneTips?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}