export const phrases = { 
 es: [ 
  "Va a pasar porque vas hacer que pase.",
   "Si tu no haces que tus días sean mágicos, ¿quién lo hará?",
   "El éxito depende más de la constancia que del talento.",
   "No bajes la meta, aumenta el esfuerzo.",
   "Algo maravilloso está a punto de sucederte.",
   "¡Échale ganas!",
   "Las cosas no serán como antes, serán mejor.",
   "La vida es una colección de momentos.",
   "Puedes llegar hasta el infinito.", 
   "Lo que es para ti, te encuentra.",
   "Cuando dejas de soñar, dejas de vivir.",
   "La mejor forma de predecir el futuro es crearlo",
   "Olvida el pasado pero recuerda la lección.", 
   "Cuando hay ganas, todo es posible.",
   "Sé como la luna y brilla aunque no estés llena.",
   "Mantén siempre actualizada tu mejor versión.",
   "Si te rodeas de luz, lo verás todo más claro.",
   "Ignorar es responder con inteligencia.",
   "Tú puedes hacerlo.",
   "Si lo puedes imaginar, lo puedes programar.",
   "Todo lo bueno no es facil.",
   "Gracias por usar el servicio Web"


 ]
}
export const lang = {
  es: {
    server: {
      out: [
        "El servidor no está disponible",
        "Estamos trabajando para arreglarlo",
      ],
    },
    components: {
      moveCash: ["Añadir costo o gasto"],
      incomingCash: {
        title: ["Añadir dinero entrante"],
        destiny: ["Destinar a "],
      },
      detailsWeek: {
        title: ["Detalles"],
        greeting: ["Hola"],
        infFirst: ["Aquí esta tu balance de cuenta"],
        AccountStats: ["Rubros: "],
        netWorth: ["Patrimonio"],
        savings: ["Ahorro"],
        debts: ["Deudas"],
        abilityToBorrow: ["Borrow"],
      },
      debts: {
        title: ["Acerca de las deudas"],
        name: ["Nombre"],
        relationship: ["Relacion"],
        mountToPay: ["Monto"],
        paid: ["Pagado"],
        cashLeft: ["A pagar"],
        modify: ["Modificar deuda"], 
        pay: ["Pagar"],
        aum: ["Aumentar"],
        inf: ["El dinero acredia, afectara a:"],
        destiny: ["Destinar a:"],
        everyone: ["A todos"]
      },
    },
    buttons: {
      add: ["Añadir"],
      weekly: ["Diferir semanalmente"],
      increase: ["Aumentar"],
      decrease: ["Disminuir"],
      update: ["Actualizar datos"],
      sending: ["Enviando datos..."],
    },
    message: {
      addMoveCash: {
        noACategory: {
          title: ["Datos imcompletos"],
          body: ["Selecciona un rubro o categoria"],
        },
        missingNumber: {
          title: ["No existe una cantidad"],
          body: ["Debes poner un valor adecuado"],
        },
        numberNegative: {
          title: ["El numero es negativo"],
          body: ["No se aceptan montos negativos"],
        },
        excededLimit: {
          title: ["El monto que enviaste excede el limite"],
          body: ["Se registro el valor"],
        },
      },
    },
  },
  en: {
    server: {
      out: ["The server is not available", "We are working to fix it"],
    },
    components: {
      moveCash: ["Add cost or expense"],
      incomingCash: {
        title: ["Add incoming cash"],
        destiny: ["Destiny to"],
      },

      detailsWeek: {
        title: ["Details"],
        greeting: ["Hi"],
        infFirst: ["there's your account balance"],
        AccountStats: ["Account management: "],
        netWorth: ["Net Worth"],
        savings: ["Savings"],
        debts: ["Debts"],
        abilityToBorrow: ["Ability To Borrow"],
      },

      debts: {
        title: ["About debts"],
        name: ["Name"],
        relationship: ["Relationship"],
        mountToPay: ["Mount"],
        paid: ["Paid"],
        cashLeft: ["To pay"],
        modify: ["Modifiy debt"], 
        pay: ["Pay"],
        aum: ["Increase"],
        inf: ["The money credited will affect:"],
        destiny: ["Destiny to:"],
        everyone: ["Everyone"]
      },
    },
    buttons: {
      add: ["Add"],
      weekly: ["Pay weekly"],
      increase: ["Increase"],
      decrease: ["Decrease"],
      update: ["Update inf"],
      sending: ["Sending data..."],
    },
    message: {
      addMoveCash: {
        noACategory: {
          title: ["Missing arguments"],
          body: ["Select a category"],
        },
        missingNumber: {
          title: ["Number missing"],
          body: ["You must have put a number"],
        },
        numberNegative: {
          title: ["Number are negative"],
          body: ["Consider use Incoming Cash segment"],
        },
        excededLimit: {
          title: ["Max limit exceded"],
          body: ["The value has been registered"],
        },
      },
    },
  },
};
