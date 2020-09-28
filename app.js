
var turn = 0
var ban_ar = new Array(8)
for(var x = 0; x < ban_ar.length; x++){
    ban_ar[x] = new Array(8)
}
var ban = document.getElementById('battlefield')
ban_new()
ban_init()
for(var x = 0; x < 8; x++){
    for(var y = 0; y < 8; y++){
        var select_cell = ban.rows[x].cells[y];
        select_cell.onclick = function(){
            if(ban_ar[this.parentNode.rowIndex][this.cellIndex] == 0){
                if(check_reverse(this.parentNode.rowIndex,this.cellIndex) > 0){
                    ban_set()
                    cheng_turn()
                }               
            }
        }
    }
}
function ban_new(){
    for(var x = 0; x < 8; x++){
        var tr = document.createElement("tr")
        ban.appendChild(tr)
        for(var y = 0; y < 8; y++){
            var td = document.createElement("td")
            tr.appendChild(td)
        }
    }
};
function ban_init(){
    for(var x = 0; x < 8; x++){
        for(var y = 0; y < 8; y++){
            ban_ar[x][y] = 0
        }
    }
    ban_ar[3][3] = -1
    ban_ar[4][3] = 1
    ban_ar[3][4] = 1
    ban_ar[4][4] = -1
    ban_set()
    turn = 0
    cheng_turn()
};
function ban_set(){
    var stone = ""
    for(var x = 0; x < 8; x++){
        for(var y = 0; y < 8; y++){
            switch(ban_ar[x][y]){
                case 0:
                stone = ""
                break;
                case -1:
                stone = "○"
                break;
                case 1:
                stone = "●"
                break;
            }
            ban.rows[x].cells[y].innerText = stone;
        }
    }
    return true
};
function cheng_turn(){
    var turn_msg = document.getElementById('turn')
    if(turn == 0){
        turn = 1
        turn_msg.textContent = "黒の番"
        return
    }
    turn = turn * -1
    var ban_bak = new Array(8)
    var check_reverse_cnt = 0
    for(var i = 0; i < ban_ar.length; i++){
        ban_bak[i] = new Array(8)
    }
    for(var x = 0; x < 8; x++){
        for(var y = 0; y < 8; y++){
            ban_bak[x][y] = ban_ar[x][y]
        }
    }
    var white_cnt = 0
    var black_cnt = 0
    for(var x = 0; x < 8; x++){
        for(var y = 0; y < 8; y++){
            switch(ban_ar[x][y]){
                case 0:
                check_reverse_cnt = check_reverse_cnt + check_reverse(x,y)
                for(var i = 0; i < 8; i++){
                    for(var ii = 0; ii < 8; ii++){
                        ban_ar[i][ii] = ban_bak[i][ii]
                    }
                }
            break;
            case -1:
            white_cnt++
            break
            case 1:
            black_cnt++
            break
            }
        }
    }
    if(white_cnt + black_cnt == 64 || white_cnt == 0 || black_cnt == 0){
        if(white_cnt == black_cnt){
            alert("引きわけ。")
        } 
        else if(white_cnt > black_cnt){
            alert("黒："+ black_cnt + "、白："+ white_cnt + "で白の勝ち")
        } 
        else{
            alert("黒："+ black_cnt + "、白："+ white_cnt + "で黒の勝ち")
        }
    } 
    else{
        if(check_reverse_cnt == 0){
            switch(turn){
                case -1:
                alert("白の置ける場所がないため、黒の番へ")
                turn = turn * -1
                break;
                case 1:
                alert("黒の置ける場所がないため、白の番へ")
                turn = turn * -1
                break;
            }
        }
    }
    switch( turn ) {
        case -1:
        turn_msg.textContent = "白の番";
        break;
        case 1:
        turn_msg.textContent = "黒の番";
        break;
    }
};
function check_reverse(row_index,cell_indx){
    var reverse_cnt = 0
    reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1, 0) 
    reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1, 1) 
    reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 0, 1) 
    reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1, 1) 
    reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1, 0) 
    reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1,-1) 
    reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 0,-1) 
    reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1,-1) 
    return reverse_cnt
}
function line_reverse(row_index,cell_indx,add_x,add_y){
    var ban_bak = new Array(8)
    for(var i = 0; i < ban_ar.length; i++){
        ban_bak[i] = new Array(8)
    }
    for(var x = 0; x < 8; x++){
        for(var y = 0; y < 8; y++){
            ban_bak[x][y] = ban_ar[x][y]
        }
    }
    var line_reverse_cnt = 0 
    var turn_flg = 0 
    var xx = row_index 
    var yy = cell_indx 
    while(true){
        xx = xx + add_x
        yy = yy + add_y
        if(xx < 0 || xx > 7 || yy < 0 || yy > 7){
          break;
        }
        if(ban_ar[xx][yy] == 0){
            break;
        }
        if(ban_ar[xx][yy] == turn){
            turn_flg = 1
            break;
        }
        ban_ar[xx][yy] = ban_ar[xx][yy] * -1
        line_reverse_cnt++
    }
    if(line_reverse_cnt > 0){
        if(turn_flg == 0){
            for (var i = 0; i < 8; i++){
                for (var ii = 0; ii < 8; ii++){
                    ban_ar[i][ii] = ban_bak[i][ii]
                    line_reverse_cnt = 0
                }
            }
        }
        else{
            ban_ar[row_index][cell_indx] = turn
        }
    }
    return line_reverse_cnt
}
