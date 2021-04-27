# Bot serwera [KamTek Hub](https://discord.gg/phdRJCBGhT)!

## Informacje

W tym repozytorium znajdziesz cały kod bota serwerowego!

Nikt oprócz mnie nie może go dodać na swój serwer, jednakże każdy może go uruchomić samemu!

## Jak samodzielnie uruchomić bota?

Oczywiście, musisz mieć zainstalowane `NodeJS`.<br>
Potem, w konsoli Git możesz uruchomić poniższą komendę:

```git
$ git clone https://github.com/Keejmil/kamtekbot.git
```

Wszystkie pliki z projektu zostaną do ciebie skopiowane!<br><br>

Teraz, musisz zainstalować potrzebne moduły.

Spokojnie, wystarczy, że uruchomisz w konsoli komendę

```git
$ npm install
```

Wtedy, `npm` popatrzy na plik `package.json` i zainstaluje wszystkie moduły!

## Config

Teraz, musisz utworzyć plik `config.json`. W nim będziemy przechowywali większość wartości.

<table id="tabelka">
<tr>
<th>Nazwa</th><th>Wartość</th><th>Wyjaśnienie</th>
</tr>
<tr>
<th>token</th><th>Token bota.</th><th>Aby połączyć się z botem, musisz podać token, czyli login.</th>
</tr>
<tr>
<th>prefix</th><th>Prefix bota.</th><th>-</th>
</tr>
<tr>
<th>mongo_path</th><th>URI do MongoDB</th><th>Login do bazy danych</th>
</tr>
<tr>
<th>greetChannelId</th><th>ID kanału do powitań</th><th>-</th>
</tr>
<tr>
<th>suggestChannelId</th><th>ID kanału do sugestii</th><th>-</th>
</tr>
<tr>
<th>ytSuggestChannelId</th><th>ID kanału do sugestii na odcinki</th><th>-</th>
</tr>
</table>
<br><br>

Czyli, `config.json` będzie wyglądał tak:

```json
{
  "token": "token",
  "prefix": "prefix",
  "mongo_path": "mongo-path",
  "greetChannelId": "id kanału",
  "suggestChannelId": "id kanału",
  "ytSuggestChannelId": "id kanału"
}
```

Teraz, możesz korzystać z bota!<br>

## Błędy oraz propozycje

Jeżeli chcesz coś dodać bądź zgłosić błąd, otwórz <b>pull request</b> bądź <b>issue</b>.
