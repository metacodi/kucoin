import { KucoinMarketType, KucoinOrderSide } from "./kucoin.types";


export type WsConnectionState = 'initial' | 'connecting' | 'connected' | 'reconnecting' | 'closing';

export type WsStreamType = 'user' | 'market';

export type WsUserStreamEmitterType = 'positionChange' | 'balanceUpdate' | 'orderUpdate';

export type WsMarketStreamEmitterType = 'symbolTicker';

export type WsStreamEmitterType = 'welcome' | WsUserStreamEmitterType | WsMarketStreamEmitterType;

export interface KucoinWebsocketOptions {
  /** Market associat. S'utilitza per discernir les variants de futurs: 'usdm' | 'coinm'. */
  market: KucoinMarketType;
  /** Indica si l'stream és d'usuari o de mercat. */
  streamType: WsStreamType;
  /** Public user api key. */
  apiKey?: string;
  /** Private user api key. */
  apiSecret?: string;
  /** User api passphrase. */
  apiPassphrase?: string;
  /** Indica si l'api està en mode test o en real. */
  isTest?: boolean,
  /** Indica el periode de delay abans de tornar a connectar. */
  reconnectPeriod?: number;
  /** Temps en milisegons per l'interval qua ha de manetenir viva la connexió. */
  pingInterval?: number;
  /** Temps en milisegons pel timeout si no hi ha la resposta per part del servidor. */
  pongTimeout?: number;
}


// ---------------------------------------------------------------------------------------------------
//  Subscribe . Unsubscribe
// ---------------------------------------------------------------------------------------------------

export interface KucoinEventSubscription {
  /** The id should be an unique value. Ex: `1545910660739`. */
  id: number;
  type: 'subscribe' | 'unsusbcribe';
  /** Subscribed topic. Some topics support to divisional subscribe the informations of multiple trading pairs through ",".
   * Ex: `'/market/ticker:XBTUSDM'`.
   */
  topic: string;
  /** Adopted the private channel or not. Set as false by default. */
  privateChannel?: boolean;
  /** Whether the server needs to return the receipt information of this subscription or not. Set as false by default. */
  response?: boolean;
}

// ---------------------------------------------------------------------------------------------------
//  Symbol Ticker
// ---------------------------------------------------------------------------------------------------

/** {@link https://docs.kucoin.com/futures/#get-real-time-symbol-ticker Get Real-Time Symbol Ticker} */
export interface KucoinSymbolTickerEvent {
  /** Ex: `"ticker"`. */
  subject: string;
  /** Ex: `"/contractMarket/ticker:XBTUSDM"`. */
  topic: string;
  data: {
    /** Market of the symbol. Ex: `"XBTUSDM"`. */
    symbol: string;
    /** Sequence number which is used to judge the continuity of the pushed messages. Ex: `45`. */
    sequence: number;
    /** Transaction side of the last traded taker order. Ex: `"sell"`. */
    side: KucoinOrderSide;
    /** Filled price. Ex: `3600.00`. */
    price: number;
    /** Filled quantity. Ex: `16`. */
    size: number;
    /** Order ID. Ex: `"5c9dcf4170744d6f5a3d32fb"`. */
    tradeId: string;
    /** Best bid size. Ex: `795`. */
    bestBidSize: number;
    /** Best bid . Ex: `3200.00`. */
    bestBidPrice: number;
    /** Best ask size. Ex: `3600.00`. */
    bestAskPrice: number;
    /** Best ask. Ex: `284`. */
    bestAskSize: number;
    /** Filled time - nanosecond. Ex: `1553846081210004941`. */
    ts: number;
  }
}

// ---------------------------------------------------------------------------------------------------
//  Trade Orders
// ---------------------------------------------------------------------------------------------------

/** {@link https://docs.kucoin.com/futures/#trade-orders Trade Orders} */
export interface KucoinTradeOrdersEvent {
  /** Ex: `"message"`. */
  type: string;
  /** Ex: `"/contractMarket/tradeOrders"`. */
  topic: string;
  /** Ex: `"orderChange"`. */
  subject: string;
  /** Ex: `"private"`. */
  channelType: string;
  data: {
    /** Order ID. Ex: `"5cdfc138b21023a909e5ad55"`. */
    orderId: string;
    /** symbol. Ex: `"XBTUSDM"`. */
    symbol: string;
    /** Message Type: "open", "match", "filled", "canceled", "update" . Ex: `"match"`. */
    type: string;
    /** Order Status: "match", "open", "done". Ex: `"open"`. */
    status: string;
    /** Match Size (when the type is "match"). Ex: `""`. */
    matchSize: string;
    /** Ex: `"",// Match Price (when the type is "match")`. */
    matchPrice: string;
    /** Order Type, "market" indicates market order, "limit" indicates limit order. Ex: `"limit"`. */
    orderType: string;
    /** Trading direction,include buy and sell. Ex: `"buy"`. */
    side: string;
    /** Order Price. Ex: `"3600"`. */
    price: string;
    /** Order Size. Ex: `"20000"`. */
    size: string;
    /** Remaining Size for Trading. Ex: `"20001"`. */
    remainSize: string;
    /** Filled Size. Ex: `20000"`. */
    filledSize: string;
    /** In the update message, the Size of order reduced. Ex: `"0"`. */
    canceledSize: string;
    /** Trade ID (when the type is "match"). Ex: `"5ce24c16b210233c36eexxxx"`. */
    tradeId: string;
    /** clientOid. Ex: `"5ce24c16b210233c36ee321d"`. */
    clientOid: string;
    /** Order Time. Ex: `1545914149935808589`. */
    orderTime: number;
    /** Size Before Update (when the type is "update"). Ex: `"15000"`. */
    oldSize: string;
    /** Trading direction, buy or sell in taker. Ex: `"maker"`. */
    liquidity: string;
    /** Timestamp. Ex: `1545914149935808589`. */
    ts: number;
  }
}


// ---------------------------------------------------------------------------------------------------
//  Account Balance Events
// ---------------------------------------------------------------------------------------------------

/** {@link https://docs.kucoin.com/futures/#account-balance-events Account Balance Events} */
export interface KucoinOrderMarginEvent {
  /** Deprecated, will detele later. Ex: `'xbc453tg732eba53a88ggyt8c'`. */
  userId: string;
  /** Ex: `'/contractAccount/wallet'`. */
  topic: string;
  /** Ex: `'orderMargin.change'`. */
  subject: string;
  data: {
    /** Current order margi. Ex: `5923`. */
      orderMargin: number;
      /** Currenc. Ex: `'USDT'`. */
      currency: string;
      /** Ex: `1553842862614`. */
      timestamp: number;
  }
}


/** {@link https://docs.kucoin.com/futures/#account-balance-events Account Balance Events} */
export interface KucoinAvailableBalanceEvent {
  /** Deprecated, will detele later. Ex: `'xbc453tg732eba53a88ggyt8c'`. */
  userId: string;
  /** Ex: `'/contractAccount/wallet'`. */
  topic: string;
  /** Ex: `'availableBalance.change'`. */
  subject: string;
  data: {
    /** Current available amount. Ex: `5923`. */
    availableBalance: number;
    /** Frozen amount. Ex: `2312`. */
    holdBalance: string;
    /** Currency. Ex: `'USDT'`. */
    currency: number;
    /** Ex: `1553842862614`. */
    timestamp: number;
  }
}


// ---------------------------------------------------------------------------------------------------
//  Position Change Events
// ---------------------------------------------------------------------------------------------------

/** {@link https://docs.kucoin.com/futures/#position-change-events Position Change Events} */
export interface KucoinPositionChangeEvents {
  /** Ex: `'message'` */
  type: string;
  /** @deprecated will detele later. Ex: `'5c32d69203aa676ce4b543c7'` */
  userId: string;
  /** Ex: `'private'` */
  channelType: string;
  /** Ex: `'/contract/position:XBTUSDM'` */
  topic: string;
  /** Ex: `'position.change'` */
  subject: string;
  data: {
    /** Accumulated realised profit and loss. Ex: `0E-8`. */
    realisedGrossPnl: string;
    /** Symbol. Ex: `'XBTUSDM'`. */
    symbol: number;
    /** Cross mode or not. Ex: `false`. */
    crossMode: boolean;
    /** Liquidation price. Ex: `1000000.0`. */
    liquidationPrice: number;
    /** Manually added margin amount . Ex: `0E-8`. */
    posLoss: number;
    /** Average entry price. Ex: `7508.22`. */
    avgEntryPrice: number;
    /** Unrealised profit and loss. Ex: `-0.00014735`. */
    unrealisedPnl: number;
    /** Mark price. Ex: `7947.83`. */
    markPrice: number;
    /** Position margin. Ex: `0.00266779`. */
    posMargin: number;
    /** Auto deposit margin or not. Ex: `false`. */
    autoDeposit: boolean;
    /** Risk limit. Ex: `100000`. */
    riskLimit: number;
    /** Unrealised value. Ex: `0.00266375`. */
    unrealisedCost: number;
    /** Bankruptcy cost . Ex: `0.00000392`. */
    posComm: number;
    /** Maintenance margin. Ex: `0.00001724`. */
    posMaint: number;
    /** Position value. Ex: `0.00266375`. */
    posCost: number;
    /** Maintenance margin rate. Ex: `0.005`. */
    maintMarginReq: number;
    /** Bankruptcy price. Ex: `1000000.0`. */
    bankruptPrice: number;
    /** Currently accumulated realised position value. Ex: `0.00000271`. */
    realisedCost: number;
    /** Mark value. Ex: `0.00251640`. */
    markValue: number;
    /** Position margin     . Ex: `0.00266375`. */
    posInit: number;
    /** Realised profit and losts. Ex: `-0.00000253`. */
    realisedPnl: number;
    /** Position margin . Ex: `0.00252044`. */
    maintMargin: number;
    /** Leverage of the order. Ex: `1.06`. */
    realLeverage: number;
    /** changeReason:marginChange、positionChange、liquidation、autoAppendMarginStatusChange、adl. Ex: `"positionChange"`. */
    changeReason: string;
    /** Current position value. Ex: `0.00266375`. */
    currentCost: number;
    /** Open time. Ex: `1558433191000`. */
    openingTimestamp: number;
    /** Current position. Ex: `-20`. */
    currentQty: number;
    /** ADL ranking percentile. Ex: `0.52`. */
    delevPercentage: number;
    /** Current commission. Ex: `0.00000271`. */
    currentComm: number;
    /** Accumulated reliased gross profit value. Ex: `0E-8`. */
    realisedGrossCost: number;
    /** Opened position or not. Ex: `true`. */
    isOpen: boolean;
    /** Manually added margin. Ex: `1.2E-7`. */
    posCross: number;
    /** Current timestamp. Ex: `1558506060394`. */
    currentTimestamp: number;
    /** Rate of return on investment. Ex: `-0.0553`. */
    unrealisedRoePcnt: number;
    /** Position profit and loss ratio. Ex: `-0.0553`. */
    unrealisedPnlPcnt: number;
    /** Currency used to clear and settle the trades. Ex: `"XBT"`. */
    settleCurrency: number;
  }
}

