// utils/formatters.ts - CÓDIGO CORRIGIDO

export function formatSupabaseDate(dateString: string): string {
    if (!dateString) {
        return '';
    }

    const date = new Date(dateString);

    const localeString = 'pt-BR';

    const options: Intl.DateTimeFormatOptions = {
        // Sem 'locale' aqui!
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo',
        hour12: false
    };

    return new Intl.DateTimeFormat(localeString, options).format(date);
}
